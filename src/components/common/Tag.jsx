import { cn } from '@/lib/utils'

export default function Tag({ children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3 py-1.5 rounded-[4px] bg-[#e8efff] text-[#2563eb] text-[10px] font-extrabold tracking-wider uppercase border border-[#dbeafe]",
        className
      )}
    >
      {children}
    </span>
  )
}
