import { clsx } from "clsx";
import { Copy, RotateCcw } from "lucide-react";
import React from "react";

interface ActionButtonProps {
  icon: React.ElementType;
  onClick?: () => void;
  title?: string; // Good for accessibility/tooltips
}

const ActionButton = ({ icon: Icon, onClick, title }: ActionButtonProps) => (
  <button
    onClick={onClick}
    title={title}
    className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
  >
    <Icon size={14} />
  </button>
);

interface CodeEditorProps {
  // 1. Change type from 'object' to 'React.ElementType'
  icon?: React.ElementType;
  title: string;
  filename: string;
  color: "blue" | "green";
  value?: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  lineCount?: number;
}

const CodeEditor = ({
  // 2. Rename 'icon' to 'Icon' (capitalized) so we can render it as <Icon />
  icon: Icon,
  title,
  filename,
  color,
  value,
  onChange,
  readOnly,
  placeholder,
  lineCount = 1,
}: CodeEditorProps) => {
  const lines = Array.from(
    { length: Math.max(15, lineCount) },
    (_, i) => i + 1
  );

  const styles = {
    blue: {
      dot: "bg-blue-500",
      tag: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      text: "text-slate-300",
      placeholder: "placeholder:text-slate-600",
      iconColor: "text-[#3776AB]",
    },
    green: {
      dot: "bg-green-500",
      tag: "bg-green-500/10 text-green-400 border-green-500/20",
      text: "text-green-300",
      placeholder: "placeholder:text-slate-700",
      iconColor: "text-[#3776AB]", // Python Blue
    },
  };

  const currentStyle = styles[color];

  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-800/50 overflow-hidden shadow-xl hover:shadow-2xl hover:border-slate-700/50 transition-all duration-500 group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/50 bg-slate-900/30">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div
              className={`w-2 h-2 rounded-full ${currentStyle.dot} opacity-50 `}
            />
            <div
              className={`w-2 h-2 rounded-full ${currentStyle.dot} opacity-30 `}
            />
          </div>
          <div
            className={`px-2 py-0.5 rounded text-xs font-mono border ${currentStyle.tag}`}
          >
            {filename}
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ActionButton
            icon={RotateCcw}
            title="Reset Code"
            onClick={() => {
              // Logic for reset (we can pass this via props later)
            }}
          />
          <ActionButton
            icon={Copy}
            title="Copy to Clipboard"
            onClick={() => {
              if (value) {
                navigator.clipboard.writeText(value);
                // Optional: Trigger a toast here
              }
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex-1 flex overflow-hidden">
        <div className="w-12 py-4 flex flex-col items-center text-xs font-mono text-slate-700 bg-slate-950/20 select-none border-r border-slate-800/30">
          {lines.map((n) => (
            <div key={n} className="h-6 leading-6">
              {n}
            </div>
          ))}
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          readOnly={readOnly}
          spellCheck={false}
          className={clsx(
            "flex-1 bg-transparent p-4 font-mono text-sm resize-none focus:outline-none leading-6",
            readOnly ? "cursor-default" : "cursor-text",
            currentStyle.text,
            currentStyle.placeholder
          )}
          placeholder={placeholder}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-1.5 text-[11px] text-slate-500 border-t border-slate-800/30 flex justify-between font-mono bg-slate-950/30 items-center">
        {/* 3. Render the Icon here next to the title */}
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon className={clsx("w-5.5 h-5.5", currentStyle.iconColor)} />
          )}
          <span className="font-medium text-slate-400 text-lg">{title}</span>
        </div>

        {/* 4. Fixed the <p> inside <span> issue */}
        <div className="flex gap-1 text-lg">
          <span className="text-slate-300 font-medium">{lineCount}</span>
          <span>lines</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
