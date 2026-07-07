import React, { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EditRoleModal({ open, member, onBack, onSubmit }) {
  if (!open || !member) return null

  return <EditRoleForm member={member} onBack={onBack} onSubmit={onSubmit} />
}

// The modal unmounts whenever it's closed (see the early return above), so
// this inner component's useState initializer re-runs fresh every time it
// opens for a member - no effect needed to sync the draft from props.
function EditRoleForm({ member, onBack, onSubmit }) {
  const [role, setRole] = useState(member.role)
  const [tag, setTag] = useState(member.tag || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(role, tag)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[16px] border border-brand-border w-full max-w-sm shadow-xl overflow-hidden animate-zoom-in">
        <div className="flex items-center justify-between px-6 py-4 bg-brand-bg border-b border-brand-border">
          <h3 className="font-serif text-sm font-bold text-brand-primary">Modify Member Role</h3>
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-brand-primary p-1 rounded-md hover:bg-gray-200/50 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Role Title</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all"
              placeholder="e.g. Lead DevOps Engineer"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Check Tag / Badge</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all"
              placeholder="e.g. Core Migration"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
            <Button
              type="button"
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-brand-text border border-brand-border text-xs font-bold px-4 py-2 rounded-[4px] cursor-pointer"
            >
              Back
            </Button>
            <Button
              type="submit"
              className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold px-4 py-2 rounded-[4px] cursor-pointer uppercase"
            >
              Save Updates
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
