import React from "react";
import { Pencil } from "lucide-react";

export default function BioCard({ bioText, onEditClick }) {
  return (
    <div className="bg-white dark:bg-[#191c1e] rounded-2xl border border-border p-6 md:p-8 relative shadow-xs font-sans">
      
      {/* Title & Edit Button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-2xl font-semibold text-foreground dark:text-[#F9F8F4]">
          Professional Biography
        </h3>
        <button 
          onClick={onEditClick}
          className="p-1 hover:bg-muted text-muted-foreground hover:text-primary dark:hover:text-white rounded-md transition-colors cursor-pointer"
          aria-label="Edit Biography"
        >
          <Pencil className="size-3.5" />
        </button>
      </div>

      {/* Biography Content */}
      <p className="text-sm md:text-base leading-relaxed text-muted-foreground dark:text-gray-300">
        {bioText}
      </p>

    </div>
  );
}
