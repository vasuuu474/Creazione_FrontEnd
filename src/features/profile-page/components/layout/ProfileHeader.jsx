import React from "react";
import { Bell } from "lucide-react";
import alexAvatar from "@/assets/alex_sterling_avatar.jpg";

export default function ProfileHeader({ onCreateIdeaClick }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-border dark:border-zinc-800 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 h-16 flex items-center justify-between">
        
        {/* Left Side: Logo & Navigation */}
        <div className="flex items-center gap-8 md:gap-12">
          {/* Logo */}
          <a href="#" className="font-sans text-2xl font-bold tracking-tight text-primary dark:text-[#b4cdb8] hover:opacity-90 transition-opacity">
            Creazione
          </a>
          
          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <a 
              href="#" 
              className="font-sans text-sm font-semibold text-primary dark:text-[#b4cdb8] hover:text-[#061b0e] dark:hover:text-white transition-colors relative after:absolute after:bottom-[-20px] after:left-0 after:w-full after:h-[2px] after:bg-primary dark:after:bg-[#b4cdb8]"
            >
              Explore
            </a>
            <a 
              href="#" 
              className="font-sans text-sm font-semibold text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors"
            >
              Home
            </a>
          </nav>
        </div>

        {/* Right Side: CTA, Notifications & Avatar */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Create Idea Button */}
          <button 
            onClick={onCreateIdeaClick}
            className="hidden sm:inline-flex items-center justify-center bg-primary hover:bg-[#355B44] text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Create Idea
          </button>
          
          {/* Mobile Create Idea Icon Button */}
          <button 
            onClick={onCreateIdeaClick}
            className="sm:hidden flex items-center justify-center bg-primary hover:bg-[#355B44] text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Create
          </button>

          {/* Notification Bell */}
          <button className="relative p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer" aria-label="Notifications">
            <Bell className="size-5" />
            <span className="absolute top-1 right-1 size-2 bg-[#ba1a1a] rounded-full ring-2 ring-white" />
          </button>

          {/* Avatar Profile */}
          <button className="relative size-9 rounded-full overflow-hidden border border-border hover:ring-2 hover:ring-primary transition-all cursor-pointer" aria-label="User profile">
            <img 
              src={alexAvatar} 
              alt="Alex Sterling" 
              className="w-full h-full object-cover" 
            />
          </button>
        </div>

      </div>
    </header>
  );
}
