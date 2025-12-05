const TopBar = () => {
  const menuItems = [
    "File",
    "Edit",
    "Selection",
    "View",
    "Go",
    "Run",
    "Terminal",
    "Help",
  ];

  return (
    <div className="text-md h-8 w-full bg-slate-950/50 border-b border-slate-800/50 flex items-center px-4 select-none backdrop-blur-sm z-50">
      {/* Window Controls (Mac style visual only) */}
      <div className="flex gap-2 mr-6">
        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
      </div>

      {/* Menu Items */}
      <div className="flex gap-4">
        {menuItems.map((item) => (
          <span
            key={item}
            className="text-slate-400 hover:text-slate-100 cursor-pointer transition-colors"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Title - Centered (Optional/Visual) */}
      <div className="ml-auto mr-4 text-slate-500 flex items-center gap-1">
        EdenyCode v1.0
      </div>
    </div>
  );
};

export default TopBar;
