import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import Tag from '@/components/common/Tag'

export default function StackTagsCard({ tags, isEditing, editState, setEditState }) {
  const [newTagInput, setNewTagInput] = useState('')

  if (isEditing) {
    const removeTag = (tagToRemove) => {
      setEditState({
        ...editState,
        tags: editState.tags.filter(t => t !== tagToRemove)
      })
    }

    const addTag = (e) => {
      e.preventDefault()
      const trimmed = newTagInput.trim().toUpperCase()
      if (trimmed && !editState.tags.includes(trimmed)) {
        setEditState({
          ...editState,
          tags: [...editState.tags, trimmed]
        })
        setNewTagInput('')
      }
    }

    return (
      <div className="bg-white border border-[#e1e4ea] rounded-[16px] p-6 shadow-sm">
        <h3 className="text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-4 select-none">
          Stack & Tags
        </h3>
        
        {/* Active Tags with Delete Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          {editState.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[4px] bg-[#e8efff] text-[#2563eb] text-[10px] font-extrabold tracking-wider uppercase border border-[#dbeafe]"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:bg-blue-100 p-0.5 rounded-full text-blue-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {editState.tags.length === 0 && (
            <p className="text-xs text-brand-text-muted py-1">No tags added yet.</p>
          )}
        </div>

        {/* Input for Adding Tags */}
        <form onSubmit={addTag} className="flex gap-2">
          <input
            type="text"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            className="flex-1 text-xs border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all uppercase"
            placeholder="Add new tag (e.g. DOCKER)"
          />
          <button
            type="submit"
            className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold rounded-[4px] px-3 flex items-center justify-center cursor-pointer transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>
    )
  }

  // Normal view mode
  return (
    <div className="bg-white border border-[#e1e4ea] rounded-[16px] p-6 shadow-sm">
      <h3 className="text-[11px] font-extrabold tracking-wider text-[#434843] uppercase mb-4 select-none">
        Stack & Tags
      </h3>
      
      <div className="flex flex-wrap gap-2.5">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {tags.length === 0 && (
          <p className="text-xs text-brand-text-muted">No tags added.</p>
        )}
      </div>
    </div>
  )
}
