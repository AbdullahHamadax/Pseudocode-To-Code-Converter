import { 
  BookOpen, 
  Variable, 
  GitBranch, 
  Repeat, 
  Code2, 
  Terminal, 
  List, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

const DocCard = ({ title, icon: Icon, description, examples, variations }: any) => (
  <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-900/10 group">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 bg-slate-800 rounded-lg text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
    </div>
    
    <p className="text-sm text-slate-400 mb-4 h-10">{description}</p>

    <div className="space-y-3">
      {examples.map((ex: any, i: number) => (
        <div key={i} className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
          <div className="flex justify-between items-center text-xs mb-1 opacity-50 uppercase tracking-wider font-semibold">
            <span className="text-blue-400">Pseudocode</span>
            <span className="text-green-400">Python Output</span>
          </div>
          <div className="flex justify-between items-center gap-4 font-mono text-xs md:text-sm">
            <span className="text-slate-300">{ex.pseudo}</span>
            <span className="text-slate-600">→</span>
            <span className="text-green-400/90">{ex.python}</span>
          </div>
        </div>
      ))}
    </div>

    {variations && (
      <div className="mt-4 pt-3 border-t border-slate-800/50">
        <p className="text-xs text-slate-500 mb-2 font-medium flex items-center gap-1">
          <Sparkles size={10} /> Also understood:
        </p>
        <div className="flex flex-wrap gap-2">
          {variations.map((v: string, i: number) => (
            <span key={i} className="text-[10px] px-2 py-1 bg-slate-800/50 text-slate-400 rounded-full border border-slate-700/30">
              "{v}"
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const Documentation = () => {
  const guides = [
    {
      title: "Variables",
      icon: Variable,
      description: "Assign values to names. The AI understands 'set', 'make', or direct assignment wording.",
      examples: [
        { pseudo: "set score to 100", python: "score = 100" },
        { pseudo: "name equals 'Alice'", python: "name = 'Alice'" }
      ],
      variations: ["make x 5", "let x be 5", "initialize count to 0"]
    },
    {
      title: "Functions",
      icon: Code2,
      description: "Define reusable blocks of code. You can be formal or conversational.",
      examples: [
        { pseudo: "create function calc_sum", python: "def calc_sum():" },
        { pseudo: "define add(a, b)", python: "def add(a, b):" }
      ],
      variations: ["function myFunc", "make a function called test", "def process"]
    },
    {
      title: "Conditionals",
      icon: GitBranch,
      description: "Control flow logic. Supports 'if', 'else', 'otherwise', and natural comparisons.",
      examples: [
        { pseudo: "if x is greater than 5", python: "if x > 5:" },
        { pseudo: "otherwise print 'No'", python: "else:\n    print('No')" }
      ],
      variations: ["if x > 10 then", "else if", "if name is 'John'"]
    },
    {
      title: "Loops",
      icon: Repeat,
      description: "Iterate over lists or ranges. Works well with 'for each' or 'repeat' syntax.",
      examples: [
        { pseudo: "for each item in items", python: "for item in items:" },
        { pseudo: "repeat 5 times", python: "for _ in range(5):" }
      ],
      variations: ["loop through data", "while x is true", "for i from 1 to 10"]
    },
    {
      title: "Lists & Arrays",
      icon: List,
      description: "Create collections of data using keywords like 'list of' or simple brackets.",
      examples: [
        { pseudo: "set nums to list of 1, 2, 3", python: "nums = [1, 2, 3]" },
        { pseudo: "add 5 to nums", python: "nums.append(5)" }
      ],
      variations: ["array of names", "create empty list", "nums = [10, 20]"]
    },
    {
      title: "Output & Input",
      icon: Terminal,
      description: "Display text to the console or get user input.",
      examples: [
        { pseudo: "print 'Hello World'", python: "print('Hello World')" },
        { pseudo: "ask user for name", python: "name = input('name: ')" }
      ],
      variations: ["display result", "show 'Error'", "output total"]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-200 flex items-center gap-3 mb-3">
          <BookOpen className="text-blue-400" /> 
          Documentation & Guide
        </h2>
        <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
          EdenyCode uses advanced AI to understand your logic. While pseudocode isn't a strict language, 
          following these patterns ensures the most accurate Python generation. 
        </p>
      </div>

      {/* Pro Tips Banner */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
          <Sparkles className="text-blue-400" size={24} />
        </div>
        <div>
          <h4 className="text-slate-200 font-semibold mb-1">AI Flexibility Tip</h4>
          <p className="text-xs text-slate-400">
            You don't need to memorize exact syntax. If you write <span className="text-blue-300 font-mono">"create a function"</span> or <span className="text-blue-300 font-mono">"def my_func"</span>, the AI understands both! Focus on the logic, and let the backend handle the translation.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <DocCard key={index} {...guide} />
        ))}
      </div>

      {/* Formatting Note */}
      <div className="mt-8 p-4 border border-dashed border-slate-700 rounded-xl text-center">
        <h4 className="text-slate-400 text-sm font-semibold mb-2 flex items-center justify-center gap-2">
          <CheckCircle2 size={16} className="text-green-500" />
          Indentation Matters
        </h4>
        <p className="text-xs text-slate-500">
          Just like Python, try to indent your pseudocode to show which lines belong inside loops or functions.
          However, the AI is smart enough to infer context most of the time!
        </p>
      </div>
    </div>
  );
};

export default Documentation;