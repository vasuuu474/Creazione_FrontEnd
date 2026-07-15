import { X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HelpModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-lg shadow-xl overflow-hidden animate-zoom-in">
        <div className="px-6 py-5 bg-[#1b3022] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#819986]" />
            <h3 className="font-serif text-lg font-bold">Creazione Help Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-md hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm text-brand-text-muted leading-relaxed">
          <p className="font-semibold text-brand-primary">Welcome to Creazione Workspace!</p>
          <p>This workspace serves as the centralized interior hub for your project concept, allowing team coordination, architectural planning, and founder consultations.</p>

          <div className="bg-brand-bg p-3.5 rounded-lg border border-brand-border space-y-2">
            <h4 className="text-[11px] font-extrabold text-brand-primary uppercase tracking-wider">Features Cheatsheet</h4>
            <ul className="list-disc list-inside text-xs space-y-1.5">
              <li><strong className="text-brand-primary">Edit Project:</strong> Modify titles, descriptions, and customize stack tags.</li>
              <li><strong className="text-brand-primary">Team Management:</strong> View the active team members roster.</li>
              <li><strong className="text-brand-primary">Contact Founder:</strong> Instantly launch the communication portal directly inside the dashboard.</li>
            </ul>
          </div>

          <div className="flex justify-end pt-2 border-t border-brand-border">
            <Button
              onClick={onClose}
              className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold px-5 py-2.5 rounded-[4px] cursor-pointer"
            >
              Got It
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
