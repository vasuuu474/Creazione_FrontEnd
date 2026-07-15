import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { useUIStore } from '@/store/useUIStore'

export default function Toast() {
  const toastMessage = useUIStore((state) => state.toastMessage)

  if (!toastMessage) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1b3022] text-white text-xs font-semibold px-4 py-3 rounded-lg shadow-lg border border-white/10 animate-slide-up select-none">
      <CheckCircle2 className="w-4 h-4 text-[#819986]" />
      <span>{toastMessage}</span>
    </div>
  )
}
