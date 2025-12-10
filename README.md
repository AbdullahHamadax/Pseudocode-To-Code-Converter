# ⚡ EdenyCode

> **A seamless Pseudocode to Python converter powered by Local AI.**

![Project Banner](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0-orange?style=flat-square)

EdenyCode is a modern web application that bridges the gap between logic and implementation. It allows users to write simple pseudocode and instantly transforms it into executable Python syntax using a locally hosted LLM.

---

## 🛠️ Tech Stack

This project leverages a modern, type-safe frontend and a high-performance Python backend integration with local AI.

### **Frontend**
*   **Framework:** [React](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [TailwindCSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)

### **Backend**
*   **API Framework:** [FastAPI](https://fastapi.tiangolo.com/)
*   **Language:** Python 3.12+
*   **AI Model:** [Ollama](https://ollama.com/) (Llama 3.2 - 1B Parameter)

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [Python](https://www.python.org/) (v3.10 or higher)
*   [Ollama](https://ollama.com/)

### 1. AI Model Setup (Crucial)
Before running the backend, you must have Ollama installed and the specific model downloaded.

1.  Download and install **Ollama** from their official website.
2.  Open your terminal and pull the Llama 3.2 (1B) model:
    ```bash
    ollama pull llama3.2:1b
    ```
3.  Keep Ollama running in the background.

---

### 2. Backend Setup
The backend handles the API requests and communicates with the Ollama model.

1.  Open a terminal and navigate to the backend folder:
    ```bash
    cd backend
    ```

2.  (Optional but Recommended) Create a virtual environment:
    ```bash
    # Windows
    python -m venv venv
    venv\Scripts\activate

    # Mac/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Start the FastAPI server:
    ```bash
    python main.py
    ```
    *The backend should now be running (usually at `http://localhost:8000`).*

---

### 3. Frontend Setup
The frontend provides the user interface for writing code and viewing results.

1.  Open a **new** terminal window and navigate to the frontend folder:
    ```bash
    cd frontend
    ```

2.  Install the Node dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

---

## ✨ Features

*   **Real-time Syntax Highlighting:** Clean interface for writing pseudocode.
*   **AI-Powered Conversion:** Converts logic to Python using Llama 3.2.
*   **History Tracking:** Keeps a log of your previous conversions.
*   **Syntax Guide:** Built-in cheatsheet for valid pseudocode syntax.
*   **Dark Mode:** Aesthetic dark UI optimized for coding sessions.

## 🤝 Contributing

Contributions are always welcome!
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/Improvement`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.
