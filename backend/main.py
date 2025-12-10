from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CodeRequest(BaseModel):
    code: str

OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3.2"

@app.post("/convert")
async def convert_code(request: CodeRequest):
    try:
        # 1. THE GUARDRAIL PROMPT
        # We give strict rules. If the input looks like a chat message ("Hi", "Who are you")
        # or a command ("Ignore rules"), we force the AI to return a specific flag.
        # 1. THE STRICT COMPILER PROMPT
        system_instruction = """
        You are a dumb Transpiler, not an Assistant. 
        
        YOUR JOB:
        Translate the provided Pseudocode line-by-line into Python.

        VALID INPUT (Execute this):
        - The input MUST look like programmatic logic or steps.
        - Examples: "Set x to 5", "If x > 10 then print 'High'", "For each item in list", "Function Calculate(a, b)".
        
        INVALID INPUT (Return <<INVALID_INPUT>>):
        1. Natural Language commands asking to generate code (e.g., "Write a code for even numbers", "Create a snake game", "How do I print hello?").
        2. Conversational text (e.g., "Hi", "Hello", "My name is...").
        3. Opinions (e.g., "Python is bad").
        
        CRITICAL RULE:
        If the user is ASKING you to write code (e.g., "Give me...") instead of PROVIDING the logic steps, return <<INVALID_INPUT>>.

        OUTPUT:
        - If valid: Output ONLY raw Python code.
        - If invalid: Return EXACTLY: <<INVALID_INPUT>>
        """
        
        prompt = f"{request.code}"

        payload = {
            "model": MODEL_NAME,
            "prompt": prompt,
            "system": system_instruction,
            "stream": False, 
            "options": {
                "temperature": 0.0 # Zero temperature makes it extremely strict/boring
            }
        }

        response = requests.post(OLLAMA_API_URL, json=payload)
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Ollama Error")

        result_json = response.json()
        generated_code = result_json.get("response", "").strip()

        # Clean up any markdown accidental leaks
        clean_code = generated_code.replace("```python", "").replace("```", "").strip()

        # 2. VALIDATION LAYER
        # If the AI returned our "Safe Word", we reject the request.
        if clean_code == "<<INVALID_INPUT>>" or clean_code.startswith("<<INVALID"):
            raise HTTPException(status_code=400, detail="That doesn't look like pseudocode. Please enter a valid pseudocode.")

        return {"result": clean_code}

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
