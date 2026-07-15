import React, { useState } from 'react'
import { X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ContactFounderModal({ open, founderName, founderEmail, onClose, onSubmit }) {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!subject.trim()) return
    onSubmit(subject, body)
    setSubject('')
    setBody('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-lg shadow-xl overflow-hidden animate-zoom-in">
        <div className="flex items-center justify-between px-6 py-4 bg-[#1b3022] text-white">
          <div>
            <h3 className="font-serif text-base font-bold">Contact Founder</h3>
            <p className="text-[10px] text-[#819986] font-semibold mt-0.5">Send message to {founderName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-md hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">To</label>
            <input
              type="text"
              disabled
              value={`${founderName} (${founderEmail})`}
              className="w-full text-xs border border-brand-border rounded-[4px] px-3 py-2 bg-gray-100 font-semibold text-brand-text-muted"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Subject</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all"
              placeholder="Inquiry regarding Cloud Orchestration"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Message Content</label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all min-h-[140px]"
              placeholder="Hi Dr. Thorne, I would like to join/discuss..."
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
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
