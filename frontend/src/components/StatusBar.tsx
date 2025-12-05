import { CheckCircle2, Zap } from "lucide-react";
import { SiPython } from "react-icons/si";

interface StatusBarProps {
  status: string;
}

const StatusBar = ({ status }: StatusBarProps) => {
  return (
    <div className="h-6 bg-slate-950/80 border-t border-slate-800/50 flex items-center px-4 text-md text-slate-500 select-none z-50">
      <div className="flex items-center gap-2 mr-4 hover:text-blue-400 cursor-pointer transition-colors">
        <Zap size={10} className="text-yellow-500" />
        <span>EdenyCode v1.0</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 hover:text-slate-300 cursor-pointer transition-colors">
          <SiPython size={11} className="text-[#3776AB]" />
          <span>Python 3.12.0</span>
        </div>
        <span className="hover:text-slate-300 cursor-pointer">Spaces: 4</span>
        <span className="hover:text-slate-300 cursor-pointer">UTF-8</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {status === "Successfully compiled" && (
          <CheckCircle2 size={10} className="text-green-500" />
        )}
        <span
          className={
            status === "Processing..." ? "text-blue-400 animate-pulse" : ""
          }
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
