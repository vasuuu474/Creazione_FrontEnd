
export default function ProjectHeader({ title, phase, updatedText }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-brand-border">
      <div>
        {/* Phase Badge & Time */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="bg-[#1b3022] text-white text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-[4px] uppercase select-none">
            Active Phase: {phase}
          </span>
          <span className="text-xs text-brand-text-muted font-medium select-none">
            &bull; {updatedText}
          </span>
        </div>
        
        {/* Title */}
        <h1 className="font-serif text-3xl md:text-[40px] font-bold text-brand-primary mt-3 leading-tight tracking-tight">
          {title}
        </h1>
      </div>
    </div>
  )
}
