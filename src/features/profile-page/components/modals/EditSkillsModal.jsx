import React, { useState, useEffect } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Trash2 } from 'lucide-react'

export default function EditSkillsModal({ isOpen, skills, onClose, onSubmit }) {
  const [tempSkills, setTempSkills] = useState([])
  const [newSkillForm, setNewSkillForm] = useState('')
  const [errorToast, setErrorToast] = useState(null)

  useEffect(() => {
    if (isOpen) {
      setTempSkills([...skills])
      setNewSkillForm('')
      setErrorToast(null)
    }
  }, [isOpen, skills])

  const handleAddTempSkill = () => {
    if (!newSkillForm.trim()) {
      showError('Skill cannot be empty.')
      return
    }
    if (
      tempSkills.some(
        (s) => s.toLowerCase() === newSkillForm.trim().toLowerCase()
      )
    ) {
      showError('Skill already exists in the list.')
      return
    }
    setTempSkills([...tempSkills, newSkillForm.trim()])
    setNewSkillForm('')
    setErrorToast(null)
  }

  const handleRemoveTempSkill = (idx) => {
    setTempSkills(tempSkills.filter((_, i) => i !== idx))
  }

  const showError = (msg) => {
    setErrorToast(msg)
    setTimeout(() => setErrorToast(null), 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(tempSkills)
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Manage Professional Skills">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Error notification */}
        {errorToast && (
          <div className="bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6] text-xs p-2.5 rounded-lg font-semibold animate-fade-in">
            {errorToast}
          </div>
        )}

        {/* Current Skills List */}
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto mb-2 pr-1 border border-border/60 rounded-lg p-2 bg-[#f8f9fc] dark:bg-zinc-800">
          <span className="text-[10px] font-bold text-muted-foreground uppercase px-1">
            Current Skills
          </span>
          {tempSkills.length === 0 ? (
            <span className="text-xs text-muted-foreground italic p-2">
              No skills added yet.
            </span>
          ) : (
            tempSkills.map((skill, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white dark:bg-zinc-700/60 p-2 rounded border border-border/40 text-foreground"
              >
                <span className="text-xs md:text-sm font-medium text-[#191c1e] dark:text-white">
                  {skill}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveTempSkill(idx)}
                  className="p-1 text-[#ba1a1a] hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                  aria-label={`Remove ${skill}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add New Skill Section */}
        <div className="border-t border-border pt-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-2">
            Add Skill
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Skill name (e.g. Docker)"
              value={newSkillForm}
              onChange={(e) => setNewSkillForm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddTempSkill()
                }
              }}
              className="flex-1 bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-1.5 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white"
            />
            <button
              type="button"
              onClick={handleAddTempSkill}
              className="bg-primary hover:bg-[#355B44] text-white px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Dialog Action Buttons */}
        <div className="flex justify-end gap-3 mt-4 border-t border-border pt-4">
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
