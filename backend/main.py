from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from converter import CodeConverter

app = FastAPI()

# Allow connection from your React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], # Add your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the converter
converter = CodeConverter()

# Define the Input Model
class CodeRequest(BaseModel):
    code: str

@app.get("/")
def read_root():
    return {"status": "EdenyCode API is running"}

@app.post("/convert")
async def convert_code(request: CodeRequest):
    try:
        # Run the conversion logic
        python_code = converter.parse(request.code)
        return {"result": python_code}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)