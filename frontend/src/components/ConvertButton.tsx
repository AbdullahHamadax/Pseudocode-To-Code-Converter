import { clsx } from "clsx";
import { ArrowRight, Sparkles } from "lucide-react";

interface ConvertButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const ConvertButton = ({ onClick, isLoading }: ConvertButtonProps) => {
  return (
    <div className="flex justify-center my-6">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={clsx(
          "relative group overflow-hidden rounded-full p-px focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900",
          isLoading
            ? "cursor-not-allowed opacity-90"
            : "cursor-pointer hover:scale-105 transition-transform duration-300"
        )}
      >
        {/* Gradient Border/Background */}
        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 group-hover:opacity-100 transition-opacity" />

        <div
          className={clsx(
            "relative flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
            "from-blue-600 via-purple-600 to-pink-600 hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
          )}
        >
          {isLoading ? (
            <>
              <Sparkles className="w-5 h-5 text-white animate-spin" />
              <span className="text-white font-semibold tracking-wide flex items-center">
                Converting
                <span className="flex ml-1">
                  <span className="animate-dot-1">.</span>
                  <span className="animate-dot-2">.</span>
                  <span className="animate-dot-3">.</span>
                </span>
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
              <span className="text-white font-semibold tracking-wide">
                Transform to Python
              </span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </div>
      </button>
    </div>
  );
};

export default ConvertButton;
