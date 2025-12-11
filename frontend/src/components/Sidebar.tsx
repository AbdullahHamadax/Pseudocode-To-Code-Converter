import { clsx } from "clsx";
import { BookOpen, Files, History, Zap } from "lucide-react";

interface SidebarProps {
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ onToggle, activeTab, onTabChange }: SidebarProps) => {
  const icons = [
    { id: "editor", icon: Files, label: "Explorer" },
    { id: "history", icon: History, label: "History" },
    { id: "docs", icon: BookOpen, label: "Documentation" },
  ];

  return (
    <div className="w-14 h-full flex flex-col items-center py-4 bg-slate-900/40 border-r border-slate-800/50 relative z-40">
      {/* Toggle / Logo Button */}
      <button
        onClick={onToggle}
        className="mb-8 p-2 rounded-lg bg-linear-to-br from-blue-500/20 to-purple-600/20 border border-yellow-500/30 
                   cursor-pointer hover:scale-110 hover:border-yellow-500/50 transition-all duration-300 group"
        title="Collapse Sidebar"
      >
        <Zap className="w-5 h-5 text-yellow-500 group-hover:fill-yellow-500/20" />
      </button>

      <div className="flex flex-col gap-6 w-full items-center">
        {icons.map((item) => {
          const Icon = item.icon;
          // Use the prop 'activeTab' instead of local state
          const isActive = activeTab === item.id;

          return (
            <div
              key={item.id}
              className="relative group w-full flex justify-center"
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              )}

              <button
                // Call the parent function
                onClick={() => onTabChange(item.id)}
                className={clsx(
                  "p-2 rounded-lg transition-all duration-300 cursor-pointer",
                  isActive
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                )}
              >
                <Icon size={22} strokeWidth={1.5} />
              </button>

              {/* Tooltip */}
              <div
                className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 
                            bg-slate-800/90 text-slate-200 text-xs rounded-md border border-slate-700
                            opacity-0 -translate-x-2.5 pointer-events-none
                            group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50 shadow-xl"
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
