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
        # I removed the double assignment typo (system_instruction =)
        # I updated the prompt to be a "Smart Generator" instead of a "Dumb Transpiler"
        system_instruction = """
    You are a Python Code Generator.
    
    YOUR JOB:
    Convert the user's input into executable Python code. You must understand both structured pseudocode AND natural language coding instructions.

    VALID INPUT (Convert this to Python):
    1. Explicit Logic: "Set x to 5", "Loop while x < 10".
    2. Coding Instructions: "Create a function that scrapes www.test.com", "Write a function to calculate the area of a circle".
    3. Imperative Commands: "Print 'hello'", "Sort this list".
    4. Beginner English: If the user describes what they want in plain English (e.g., "I want a program that..."), interpret their intent and write the code.

    INVALID INPUT (Return <<INVALID_INPUT>>):
    1. Pure Conversation: "Hi", "Hello", "How are you?", "Who are you?".
    2. Opinions/Rants: "Python is bad", "I hate coding".
    3. Non-Coding Questions: "What is the capital of France?".

    OUTPUT FORMATTING RULES:
    1. Output ONLY the raw Python code.
    2. STRICTLY FORBIDDEN: Do NOT use Markdown code blocks (```python ... ```).
    3. Do NOT use single backticks (`).
    4. Do NOT add any explanations, notes, or preamble.
    5. LOGIC GENERATION: If the user describes a function (e.g., "scrape a website"), you MUST write the actual logic, including importing necessary libraries (like 'requests' or 'math') if needed. Do NOT just write 'pass'.
    
    ERROR HANDLING:
    - If the input is conversational/opinion/irrelevant: Return EXACTLY: <<INVALID_INPUT>>
    """
        
        prompt = f"{request.code}"

        payload = {
            "model": MODEL_NAME,
            "prompt": prompt,
            "system": system_instruction,
            "stream": False, 
            "options": {
                "temperature": 0.2 # Slight temperature allows it to be creative enough to generate logic (like scraping code)
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
        if clean_code == "<<INVALID_INPUT>>" or clean_code.startswith("<<INVALID"):
            raise HTTPException(status_code=400, detail="That doesn't look like code instruction. Please enter a valid coding task.")

        return {"result": clean_code}

    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)