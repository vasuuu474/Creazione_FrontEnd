import { Mail, Pencil, Star } from "lucide-react";

export default function FounderCard({ founder, onEditClick, onContactClick }) {
  return (
    <div className="bg-[#1b3022] dark:bg-zinc-900 text-white rounded-2xl p-6 md:p-8 relative shadow-sm overflow-hidden flex flex-col justify-between h-full min-h-[220px]">
      
      {/* Background Star Watermark */}
      <Star className="absolute right-[-20px] top-[-10px] size-40 text-white/5 pointer-events-none rotate-12" />

      {/* Edit Trigger */}
      <button 
        onClick={onEditClick}
        className="absolute top-4 right-4 p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Edit Founder Details"
      >
        <Pencil className="size-3.5" />
      </button>

      <div>
        {/* Micro Header */}
        <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#819986] uppercase block mb-4">
          Project Founder
        </span>

        {/* Founder Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="size-16 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-muted/20">
            <img 
              src={founder.avatar} 
              alt={founder.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h4 className="font-serif text-lg md:text-xl font-bold leading-tight">
              {founder.name}
            </h4>
            <p className="text-xs md:text-sm text-[#819986] font-medium mt-0.5">
              {founder.title}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onContactClick}
        className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-white/95 text-[#1b3022] font-semibold rounded-lg text-sm transition-all shadow-xs hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
      >
        <Mail className="size-4 shrink-0" />
        <span>CONTACT FOUNDER</span>
      </button>

    </div>
  );
}
