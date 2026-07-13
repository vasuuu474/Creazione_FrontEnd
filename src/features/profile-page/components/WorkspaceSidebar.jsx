import React from "react";
import { LayoutGrid, Users, HelpCircle } from "lucide-react";

export default function WorkspaceSidebar({ activeTab, onTabChange }) {
  const menuItems = [
    { id: "workspace", label: "Workspace", icon: LayoutGrid },
    { id: "members", label: "Members", icon: Users },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  return (
    <div className="w-full flex flex-col justify-between h-full font-sans min-h-[300px] lg:min-h-[500px]">
      {/* Sidebar Items */}
      <div className="flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-[#6B7280] hover:bg-muted/80 hover:text-foreground dark:text-gray-300"
              }`}
            >
              <Icon className={`size-5 mr-3 shrink-0 ${isActive ? "text-white" : "text-[#7A7A7A]"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer Muted Text */}
      <div className="mt-auto pt-10 border-t border-border/30">
        <span className="text-[10px] tracking-wide text-[#7A7A7A] uppercase font-bold block text-center lg:text-left">
          Creazione Workspace v1.0.0
        </span>
      </div>
    </div>
  );
}
