import { clsx } from "clsx";
import {
  PanelLeftOpen,
  Trash2,
  RotateCcw,
  Clock,
  AlertCircle,
} from "lucide-react"; // Added AlertCircle
import { useState } from "react";
import { DiPython } from "react-icons/di";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import CodeEditor from "./components/CodeEditor";
import ConvertButton from "./components/ConvertButton";
import Sidebar from "./components/Sidebar";
import StatusBar from "./components/StatusBar";
import SyntaxGuide from "./components/SyntaxGuide";
import TopBar from "./components/TopBar";
import Documentation from "./components/Documentation";
// Type definition for History items
interface HistoryItem {
  id: number;
  timestamp: string;
  pseudoCode: string;
  pythonCode: string;
}

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

  const [activeView, setActiveView] = useState("editor");

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem("conversionHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const handleConvert = async () => {
    setIsConverting(true);
    setStatus("Processing...");
    setPythonCode(""); // Clear previous code

    try {
      const response = await fetch("http://localhost:8000/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: pseudoCode }),
      });

      // NEW: If the backend returns an error (like 400 or 500), parse the message
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Conversion failed");
      }

      const data = await response.json();
      const generatedPython = data.result;

      setPythonCode(generatedPython);

      // Save to History
      const newEntry: HistoryItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        pseudoCode: pseudoCode,
        pythonCode: generatedPython,
      };

      const updatedHistory = [newEntry, ...history];
      setHistory(updatedHistory);
      localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));

      setStatus("Successfully compiled");
      toast.success("Code converted successfully!");
    } catch (error: any) {
      console.error(error);
      setStatus("Error");

      // NEW: Show the specific warning message from Python to the user
      toast.error(error.message);
    } finally {
      setIsConverting(false);
    }
  };

  const restoreHistory = (item: HistoryItem) => {
    setPseudoCode(item.pseudoCode);
    setPythonCode(item.pythonCode);
    setActiveView("editor");
    toast.success("Code restored from history");
  };

  const deleteHistory = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("conversionHistory", JSON.stringify(updated));
    toast.info("Item removed from history");
  };

  // --- NEW FUNCTION: CLEAR ALL ---
  const clearAllHistory = () => {
    // Simple confirmation check
    if (
      window.confirm(
        "Are you sure you want to delete ALL history? This cannot be undone."
      )
    ) {
      setHistory([]);
      localStorage.removeItem("conversionHistory");
      toast.success("All history cleared");
    }
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
            <Sidebar
              onToggle={() => setSidebarOpen(false)}
              activeTab={activeView}
              onTabChange={setActiveView}
            />
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

        <main className="flex-1 flex flex-col p-6 overflow-hidden min-w-0 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
          </div>

          {activeView === "editor" && (
            <>
              <div className="flex-1 flex gap-6 min-h-0">
                <div className="flex-1 h-full flex flex-col min-h-0">
                  <CodeEditor
                    title="Pseudocode"
                    filename="Pseudocode.psc"
                    color="blue"
                    value={pseudoCode}
                    onChange={setPseudoCode}
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
            </>
          )}

          {activeView === "history" && (
            <div className="flex-1 overflow-y-auto pr-2">
              {/* --- HEADER WITH CLEAR ALL BUTTON --- */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
                  <Clock className="text-blue-400" /> Conversion History
                </h2>

                {history.length > 0 && (
                  <button
                    onClick={clearAllHistory}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 transition-all shadow-lg shadow-red-900/10"
                  >
                    <Trash2 size={14} /> Clear All
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="text-center text-slate-500 mt-20 flex flex-col items-center">
                  <Clock size={48} className="mb-4 opacity-20" />
                  <p>No history yet. Try converting some code!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all cursor-pointer group flex flex-col h-64"
                      onClick={() => restoreHistory(item)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs text-slate-400 font-mono bg-slate-800 px-2 py-1 rounded">
                          {item.timestamp}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => deleteHistory(item.id, e)}
                            className="text-slate-500 hover:text-red-400 p-1 hover:bg-red-400/10 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                        <div className="flex-1 bg-slate-950/50 rounded p-2 text-[10px] font-mono text-slate-400 overflow-hidden relative">
                          <div className="absolute top-1 right-1 text-xs text-blue-500 opacity-50">
                            PSC
                          </div>
                          <pre>{item.pseudoCode.slice(0, 150)}...</pre>
                        </div>
                        <div className="flex-1 bg-slate-950/50 rounded p-2 text-[10px] font-mono text-green-400/70 overflow-hidden relative">
                          <div className="absolute top-1 right-1 text-xs text-green-500 opacity-50">
                            PY
                          </div>
                          <pre>{item.pythonCode.slice(0, 150)}...</pre>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-center text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <RotateCcw size={14} className="mr-1" /> Click to
                        Restore
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === "docs" && (
          <Documentation />
          )}

          <SyntaxGuide />
        </main>
      </div>

      <StatusBar status={status} />
      <Toaster
        position="top-center"
        richColors
        theme="dark"
        duration={2000}
        closeButton={false}
      />
    </div>
  );
}

export default App;
