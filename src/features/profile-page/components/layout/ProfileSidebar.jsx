import React from "react";
import { MapPin, Mail, Phone, Pencil } from "lucide-react";

export default function ProfileSidebar({ 
  languages, 
  skills, 
  onEditLanguages, 
  onEditSkills,
  profile,
  onEditProfile
}) {
  return (
    <div className="w-full flex flex-col gap-6 font-sans">
      
      {/* Profile Card */}
      <div className="bg-white dark:bg-[#191c1e] rounded-2xl border border-border p-6 md:p-8 flex flex-col items-center shadow-xs relative">
        
        {/* Edit Button */}
        <button 
          onClick={onEditProfile}
          className="absolute top-4 right-4 p-1.5 hover:bg-muted text-muted-foreground hover:text-primary dark:hover:text-white rounded-md transition-colors cursor-pointer"
          aria-label="Edit Profile"
        >
          <Pencil className="size-3.5" />
        </button>

        {/* Avatar */}
        <div className="size-28 md:size-32 rounded-full overflow-hidden border-2 border-border mb-6 hover:scale-[1.03] transition-transform">
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Name & Title */}
        <h2 className="font-serif text-2xl font-semibold text-foreground dark:text-[#d0e9d4] text-center mb-1">
          {profile.name}
        </h2>
        <p className="text-xs md:text-sm italic text-muted-foreground text-center mb-6">
          {profile.title}
        </p>

        {/* Contact Info */}
        <div className="w-full flex flex-col gap-3.5 mb-6 text-sm text-[#6B7280] dark:text-gray-300 min-w-0">
          <div className="flex items-center gap-3">
            <MapPin className="size-4 shrink-0 text-muted-foreground" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-3 min-w-0">
            <Mail className="size-4 shrink-0 text-muted-foreground" />
            <a href={`mailto:${profile.email}`} className="hover:underline truncate block flex-1">
              {profile.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="size-4 shrink-0 text-muted-foreground" />
            <a href={`tel:${profile.phone}`} className="hover:underline">
              {profile.phone}
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="w-full border-t border-border mb-6" />

        {/* Languages Section */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#7A7A7A] dark:text-[#d0e9d4] uppercase">
              Languages
            </span>
            <button 
              onClick={onEditLanguages}
              className="p-1 hover:bg-muted text-muted-foreground hover:text-primary dark:hover:text-white rounded-md transition-colors cursor-pointer"
              aria-label="Edit Languages"
            >
              <Pencil className="size-3.5" />
            </button>
          </div>

          {/* Languages Chips */}
          <div className="flex flex-wrap gap-2.5">
            {languages.map((lang, idx) => (
              <div 
                key={idx} 
                className="bg-[#f0f3ff] dark:bg-[#272c2c] text-primary dark:text-gray-200 rounded-[4px] px-3.5 py-1.5 text-xs text-center border border-border/40 min-w-[90px] flex flex-col justify-center"
              >
                <span className="font-semibold">{lang.name}</span>
                <span className="text-[10px] text-muted-foreground">({lang.level})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Skills Card */}
      <div className="bg-white dark:bg-[#191c1e] rounded-2xl border border-border p-6 md:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-[#7A7A7A] dark:text-[#d0e9d4] uppercase">
            Professional Skills
          </span>
          <button 
            onClick={onEditSkills}
            className="p-1 hover:bg-muted text-muted-foreground hover:text-primary dark:hover:text-white rounded-md transition-colors cursor-pointer"
            aria-label="Edit Skills"
          >
            <Pencil className="size-3.5" />
          </button>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span 
              key={idx} 
              className="bg-primary text-white hover:bg-[#355B44] text-[11px] font-semibold px-2.5 py-1.5 rounded-[4px] transition-colors cursor-pointer"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
