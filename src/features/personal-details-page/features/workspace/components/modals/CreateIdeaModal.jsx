import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CreateIdeaModal({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit(title, description)
    setTitle('')
    setDescription('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-lg shadow-xl overflow-hidden animate-zoom-in">
        <div className="flex items-center justify-between px-6 py-4 bg-brand-bg border-b border-brand-border">
          <h3 className="font-serif text-lg font-bold text-brand-primary">Publish New Project Idea</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-brand-primary p-1 rounded-md hover:bg-gray-200/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Project Idea Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all font-semibold"
              placeholder="e.g. Decentralized Storage System"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Description / Project Scope</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all min-h-[120px]"
              placeholder="Provide details about your project architecture, requirements, and target goals."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
            <Button
              type="button"
              onClick={onClose}
              className="bg-white hover:bg-gray-50 text-brand-text border border-brand-border text-xs font-bold px-4 py-2 rounded-[4px] cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold px-4 py-2 rounded-[4px] inline-flex items-center gap-1.5 cursor-pointer uppercase"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Idea</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
