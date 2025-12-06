import { clsx } from "clsx";
import { PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { DiPython } from "react-icons/di";
import { Toaster } from "sonner";
import CodeEditor from "./components/CodeEditor";
import ConvertButton from "./components/ConvertButton";
import Sidebar from "./components/Sidebar";
import StatusBar from "./components/StatusBar";
import SyntaxGuide from "./components/SyntaxGuide";
import TopBar from "./components/TopBar";

// 1. Define the original code here so we can use it for the Reset button
const DEFAULT_CODE = `create a function called check_scores with parameter scores
    set total to 0

    for each score in scores
        set total to total + score
        print "Adding score: " + score

    if total is greater than 100 then
        print "High Score!"
    otherwise
        print "Keep trying..."

set my_list to list of 10, 50, 80, 25
check_scores(my_list)`;

function App() {
  const [pseudoCode, setPseudoCode] = useState(DEFAULT_CODE);

  const [pythonCode, setPythonCode] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleConvert = () => {
    setIsConverting(true);
    setStatus("Processing...");
    setPythonCode("");

    setTimeout(() => {
      // 2. UPDATED PYTHON OUTPUT: Matches the function definition
      setPythonCode(
        `def check_scores(scores):
    total = 0

    for score in scores:
        total = total + score
        print("Adding score: " + str(score))

    if total > 100:
        print("High Score!")
    else:
        print("Keep trying...")

my_list = [10, 50, 80, 25]
check_scores(my_list)`
      );
      setIsConverting(false);
      setStatus("Successfully compiled");
    }, 2000);
  };
  return (
    <div className="flex flex-col h-screen bg-transparent text-slate-200 font-sans overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      <TopBar />

      <div className="flex flex-1 overflow-hidden z-10 relative">
        <div
          className={clsx(
            "transition-all duration-500 ease-in-out overflow-hidden shrink-0 relative",
            sidebarOpen ? "w-14 opacity-100" : "w-0 opacity-0"
          )}
        >
          <div className="w-14 h-full">
            <Sidebar onToggle={() => setSidebarOpen(false)} />
          </div>
        </div>

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute left-0 top-4 z-50 p-1.5 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-r-md border-y border-r border-slate-700/50 backdrop-blur-sm transition-all"
            title="Open Sidebar"
          >
            <PanelLeftOpen size={16} />
          </button>
        )}

        <main className="flex-1 flex flex-col p-6 overflow-hidden min-w-0">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          </div>
          <div className="flex-1 flex gap-6 min-h-0">
            <div className="flex-1 h-full flex flex-col min-h-0">
              <CodeEditor
                title="Pseudocode"
                filename="Pseudocode.psc"
                color="blue"
                value={pseudoCode}
                onChange={setPseudoCode}
                // 2. Here we pass the logic to restore the original code
                onReset={() => setPseudoCode(DEFAULT_CODE)}
                lineCount={pseudoCode.split("\n").length}
              />
            </div>

            <div className="flex-1 h-full flex flex-col min-h-0">
              <CodeEditor
                icon={DiPython}
                title="Python 3.12"
                filename="output.py"
                color="green"
                value={pythonCode}
                readOnly
                placeholder="# The converted Python code will appear here..."
                lineCount={pythonCode ? pythonCode.split("\n").length : 1}
              />
            </div>
          </div>
          <ConvertButton onClick={handleConvert} isLoading={isConverting} />
          <SyntaxGuide />
        </main>
      </div>

      <StatusBar status={status} />
      <Toaster
        position="top-center"
        richColors
        theme="dark"
        duration={2000} // Disappears after 2 seconds (faster)
        closeButton={false} // Clean look
        // Sonner has built-in smooth scale and fade transitions by default
      />
    </div>
  );
}

export default App;
