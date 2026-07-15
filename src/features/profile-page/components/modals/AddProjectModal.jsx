import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function AddProjectModal({ isOpen, activeTab, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [iconType, setIconType] = useState('network')

  useEffect(() => {
    if (isOpen) {
      setTitle('')
      setDescription('')
      setIsPublic(true)
      setIconType('network')
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({
      id: `proj-${Date.now()}`,
      title,
      description: description || 'No description provided.',
      isPublic,
      iconType,
    })
  }

  const tabLabel =
    activeTab === 'created'
      ? 'Created'
      : activeTab === 'worked'
      ? 'Worked On'
      : 'Invested'

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Add Project to: ${tabLabel}`}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
              Project Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., Quantum Database Router"
              className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short elevator pitch for the project"
              className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-muted-foreground uppercase mb-1">
              Icon Representation
            </label>
            <select
              value={iconType}
              onChange={(e) => setIconType(e.target.value)}
              className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white cursor-pointer"
            >
              <option value="network">Network/Nodes</option>
              <option value="shield">Shield/Security</option>
              <option value="default">Folder/Git</option>
            </select>
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
              Add Project
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
