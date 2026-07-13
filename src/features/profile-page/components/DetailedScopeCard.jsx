import React from "react";
import { Pencil } from "lucide-react";

export default function DetailedScopeCard({ scopeText, onEditClick }) {
  return (
    <div className="bg-white dark:bg-[#191c1e] rounded-2xl border border-border p-6 md:p-8 relative shadow-xs font-sans">
      
      {/* Title & Edit Button */}
      <div className="flex items-center justify-between mb-6 border-b border-border/40 pb-4">
        <h3 className="font-serif text-2xl font-bold italic tracking-tight text-foreground dark:text-[#F9F8F4]">
          Detailed Project Scope
        </h3>
        <button 
          onClick={onEditClick}
          className="p-1.5 hover:bg-muted text-muted-foreground hover:text-primary dark:hover:text-white rounded-md transition-colors cursor-pointer"
          aria-label="Edit Project Scope"
        >
          <Pencil className="size-4 text-primary" />
        </button>
      </div>

      {/* Biography Content */}
      <div className="space-y-4">
        {scopeText.split("\n\n").map((paragraph, idx) => (
          <p key={idx} className="text-sm md:text-base leading-relaxed text-[#6B7280] dark:text-gray-300">
            {paragraph}
          </p>
        ))}
      </div>

    </div>
  );
}
