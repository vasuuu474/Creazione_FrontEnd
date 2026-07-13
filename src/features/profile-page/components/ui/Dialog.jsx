import React, { useEffect } from "react";
import { X } from "lucide-react";

export function Dialog({ isOpen, onClose, title, children }) {
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-300">
      <div 
        className="fixed inset-0 bg-transparent" 
        onClick={onClose} 
      />
      <div className="relative w-full max-w-lg bg-white dark:bg-[#191c1e] rounded-lg shadow-xl border border-border overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-white dark:bg-[#191c1e]">
          <h3 className="text-xl font-bold font-serif text-primary dark:text-white">
            {title}
          </h3>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>
        </div>
        {/* Content */}
        <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
