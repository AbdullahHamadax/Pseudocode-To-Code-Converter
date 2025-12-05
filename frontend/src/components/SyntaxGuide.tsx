import { Lightbulb } from "lucide-react";

const SyntaxGuide = () => {
  const guides = [
    { title: "Functions", code: "create function X", color: "text-blue-300" },
    { title: "Conditionals", code: "if X then Y", color: "text-purple-300" },
    { title: "Loops", code: "for each X in Y", color: "text-pink-300" },
    { title: "Variables", code: "set X to Y", color: "text-green-300" },
  ];

  return (
    <div className="mt-auto bg-slate-900/40 border border-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-4 h-4 text-yellow-500" />
        <span className="text-slate-300 font-medium text-sm">
          Quick Pseudocode Syntax Guide
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {guides.map((guide) => (
          <div key={guide.title} className="flex flex-col gap-1">
            <span className="text-xs text-slate-500 font-medium">
              {guide.title}
            </span>
            <code
              className={`text-xs font-mono ${guide.color} bg-slate-950/30 px-2 py-1 rounded border border-slate-800/30 w-fit`}
            >
              {guide.code}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyntaxGuide;
