import { UserPlus, Pencil, Trash2 } from "lucide-react";

export default function TeamCard({ members, onAddClick, onEditClick, onDeleteClick }) {
  return (
    <div className="bg-white dark:bg-[#191c1e] rounded-2xl border border-border p-6 md:p-8 shadow-xs font-sans">
      
      {/* Header Info */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
        <h3 className="font-serif text-2xl font-bold text-foreground dark:text-[#F9F8F4]">
          Team
        </h3>
        <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#7A7A7A] uppercase">
          {members.length} Members
        </span>
      </div>

      {/* Members List */}
      <div className="flex flex-col gap-4 mb-6">
        {members.map((member) => (
          <div 
            key={member.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-[#1e2224] rounded-xl border border-border hover:border-primary dark:hover:border-[#355B44] transition-all duration-200"
          >
            {/* Left Side: Avatar & Details */}
            <div className="flex items-center gap-4 min-w-0">
              <div className="size-11 rounded-lg overflow-hidden border border-border shrink-0 bg-muted/20">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="min-w-0 flex flex-col">
                <h4 className="font-bold text-sm md:text-base text-foreground truncate">
                  {member.name}
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-gray-400 truncate">
                  {member.role}
                </p>
                {/* Status Badge */}
                {member.tag && (
                  <div className="flex mt-1.5">
                    <span className="inline-flex items-center text-[10px] font-semibold bg-[#dde5da] dark:bg-[#272c2c] text-primary dark:text-[#b4cdb8] px-2 py-0.5 rounded-[4px]">
                      ✓ {member.tag}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Row Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEditClick(member)}
                className="p-1.5 hover:bg-muted text-muted-foreground hover:text-primary dark:hover:text-white rounded-md transition-colors cursor-pointer"
                aria-label={`Edit ${member.name}`}
              >
                <Pencil className="size-3.5" />
              </button>
              <button
                onClick={() => onDeleteClick(member.id)}
                className="p-1.5 hover:bg-red-50 text-[#ba1a1a] hover:bg-red-950/40 rounded-md transition-colors cursor-pointer"
                aria-label={`Delete ${member.name}`}
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Add New Member Button */}
      <button
        onClick={onAddClick}
        className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-border hover:border-primary dark:hover:border-[#355B44] rounded-xl hover:bg-muted/40 transition-all duration-200 cursor-pointer group text-sm font-semibold text-primary dark:text-white"
      >
        <UserPlus className="size-4 group-hover:scale-105 transition-transform" />
        <span>Add Team Member</span>
      </button>

    </div>
  );
}
