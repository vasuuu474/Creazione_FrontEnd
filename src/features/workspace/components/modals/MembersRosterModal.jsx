import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MembersRosterModal({ open, members, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-md shadow-xl overflow-hidden animate-zoom-in flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-brand-bg border-b border-brand-border shrink-0">
          <div>
            <h3 className="font-serif text-lg font-bold text-brand-primary">Team Members Roster</h3>
            <p className="text-[10px] text-brand-text-muted font-semibold uppercase tracking-wider">{members.length} active professionals</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-brand-primary p-1 rounded-md hover:bg-gray-200/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {/* Members List */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-brand-primary uppercase tracking-wider select-none border-b pb-1">Current Members</h4>
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-2">
              {members.map((m) => (
                <div key={m.id} className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-10 h-10 rounded-md object-cover border border-brand-border shadow-sm"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                      }}
                    />
                    <div>
                      <h5 className="text-xs font-bold text-brand-primary">{m.name}</h5>
                      <p className="text-[10px] text-brand-text-muted mt-0.5">{m.role}</p>
                      {m.tag && (
                        <span className="inline-block bg-[#e8efff] text-[#2563eb] text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] mt-1">
                          {m.tag}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-brand-border bg-brand-bg flex justify-end shrink-0">
          <Button
            onClick={onClose}
            className="bg-white hover:bg-gray-50 text-brand-text border border-brand-border text-xs font-bold px-4 py-2 rounded-[4px] cursor-pointer"
          >
            Close
          </Button>
        </div>

      </div>
    </div>
  )
}
