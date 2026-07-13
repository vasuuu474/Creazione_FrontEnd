import React, { useState, useEffect } from 'react'
import { Dialog } from '@/components/ui/Dialog'

export default function EditBioModal({ isOpen, bioText, onClose, onSubmit }) {
  const [tempBioText, setTempBioText] = useState(bioText)

  useEffect(() => {
    if (isOpen) {
      setTempBioText(bioText)
    }
  }, [isOpen, bioText])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!tempBioText.trim()) return
    onSubmit(tempBioText)
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Edit Biography">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
            Professional Biography
          </label>
          <textarea
            rows="6"
            value={tempBioText}
            onChange={(e) => setTempBioText(e.target.value)}
            className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white resize-none leading-relaxed"
            required
          />
        </div>
        <div className="flex justify-end gap-3 mt-2 border-t border-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg text-xs md:text-sm font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary hover:bg-[#355B44] text-white px-5 py-2 rounded-lg text-xs md:text-sm font-semibold cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Dialog>
  )
}
