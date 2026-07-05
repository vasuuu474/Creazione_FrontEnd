import React from 'react'
import { cn } from '@/lib/utils'

export default function NavItem({ children, icon: Icon, active, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
        active
          ? "bg-[#1b3022] text-white shadow-md shadow-[#1b3022]/10"
          : "text-brand-text-muted hover:bg-gray-100 hover:text-[#1b3022]",
        className
      )}
    >
      {Icon && <Icon className={cn("w-5 h-5", active ? "text-white" : "text-gray-500")} />}
      <span>{children}</span>
    </button>
  )
}
