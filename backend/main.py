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
        system_instruction = system_instruction = """
    You are a python user-friendly assistant
    
    YOUR JOB:
    Fulfill the user's request.

    VALID INPUT (Execute this):
    - Natural Language commands asking YOU to create code (e.g., "Write a code for even numbers", "Create a snake game", "How do I print hello?").
    - I/O Commands: "Print 'hello'", "Output variable x", "Display result", "Log error".
    - Pseudocode Logic Examples: "Set x to 5", "If x > 10 then print 'High'", "For each item in list", "Function Calculate(a, b)".
    
    INVALID INPUT (Return <<INVALID_INPUT>>):
    1. Conversational text (e.g., "Hi", "Hello", "My name is...").
    2. Opinions (e.g., "Python is bad").
    3. Out of Context questions ( e.g., "Who is the best marvel character" )
    
    OUTPUT FORMATTING RULES:
    - Output ONLY the raw Python code.
    - STRICTLY FORBIDDEN: Do NOT use Markdown code blocks (```python ... ```).
    - STRICTLY FORBIDDEN: Do NOT use single backticks (`).
    - Do NOT add any explanations or preamble.
    - You can add comments to explain the code for user.
    
    ERROR HANDLING:
    - If invalid: Return EXACTLY: <<INVALID_INPUT>>
    """
        
        prompt = f"{request.code}"

        payload = {
            "model": MODEL_NAME,
            "prompt": prompt,
            "system": system_instruction,
            "stream": False, 
            "options": {
                "temperature": 0.0 
            }
        }

        response = requests.post(OLLAMA_API_URL, json=payload)
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Ollama Error")

        result_json = response.json()
        generated_code = result_json.get("response", "").strip()

        clean_code = generated_code.replace("```python", "").replace("```", "").strip()

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
