import { useState } from "react";
import { Pencil, Check } from "lucide-react";

export default function ExpertiseCard({ expertise, onUpdateExpertise }) {
  const [isEditing, setIsEditing] = useState(false);
  const [level, setLevel] = useState(expertise.level);
  const [percentage, setPercentage] = useState(expertise.percentage);
  const [subtitle, setSubtitle] = useState(expertise.subtitle);

  const handleSave = () => {
    onUpdateExpertise({ level, percentage: Number(percentage), subtitle });
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-[#191c1e] rounded-2xl border border-border p-6 md:p-8 shadow-xs font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#7A7A7A] uppercase">
          Expertise Progression
        </span>
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="p-1 hover:bg-muted text-muted-foreground hover:text-[#355B44] dark:hover:text-white rounded-md transition-colors cursor-pointer"
          aria-label={isEditing ? "Save Expertise" : "Edit Expertise"}
        >
          {isEditing ? <Check className="size-4 text-[#1b3022] dark:text-white font-bold" /> : <Pencil className="size-3.5" />}
        </button>
      </div>

      {isEditing ? (
        /* Edit Form */
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Level Name</label>
            <input 
              type="text" 
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Percentage</span>
              <span>{percentage}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="w-full h-1.5 bg-[#f0f3ff] rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Subtitle</label>
            <input 
              type="text" 
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      ) : (
        /* Display Card */
        <div className="flex flex-col gap-4">
          
          {/* Level Badge and Percentage */}
          <div className="flex items-center justify-between">
            <span className="bg-primary text-white text-[10px] md:text-xs font-bold tracking-wider px-2.5 py-1.5 rounded-[4px] uppercase">
              {expertise.level}
            </span>
            <span className="text-sm font-bold text-foreground dark:text-[#F9F8F4]">
              {expertise.percentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-[#f0f3ff] dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary dark:bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${expertise.percentage}%` }}
            />
          </div>

          {/* Subtitle */}
          <p className="text-xs md:text-sm italic text-muted-foreground">
            {expertise.subtitle}
          </p>

        </div>
      )}

    </div>
  );
}
