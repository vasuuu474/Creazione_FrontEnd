import React, { useState, useEffect } from 'react'
import { Dialog } from '@/components/ui/Dialog'
import { Trash2 } from 'lucide-react'

export default function EditLanguagesModal({ isOpen, languages, onClose, onSubmit }) {
  const [tempLanguages, setTempLanguages] = useState([])
  const [newLangForm, setNewLangForm] = useState({ name: '', level: 'Basic' })
  const [errorToast, setErrorToast] = useState(null)

  useEffect(() => {
    if (isOpen) {
      setTempLanguages([...languages])
      setNewLangForm({ name: '', level: 'Basic' })
      setErrorToast(null)
    }
  }, [isOpen, languages])

  const handleAddTempLanguage = () => {
    if (!newLangForm.name.trim()) {
      showError('Language name cannot be empty.')
      return
    }
    if (
      tempLanguages.some(
        (l) => l.name.toLowerCase() === newLangForm.name.trim().toLowerCase()
      )
    ) {
      showError('Language already exists in the list.')
      return
    }
    setTempLanguages([...tempLanguages, { name: newLangForm.name.trim(), level: newLangForm.level }])
    setNewLangForm({ name: '', level: 'Basic' })
    setErrorToast(null)
  }

  const handleRemoveTempLanguage = (idx) => {
    setTempLanguages(tempLanguages.filter((_, i) => i !== idx))
  }

  const showError = (msg) => {
    setErrorToast(msg)
    setTimeout(() => setErrorToast(null), 3000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(tempLanguages)
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Manage Languages">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Error Notification inside modal for validation */}
        {errorToast && (
          <div className="bg-[#ffdad6] text-[#ba1a1a] border border-[#ffdad6] text-xs p-2.5 rounded-lg font-semibold">
            {errorToast}
          </div>
        )}

        {/* Current Languages List */}
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto mb-2 pr-1 border border-border/60 rounded-lg p-2 bg-[#f8f9fc] dark:bg-zinc-800">
          <span className="text-[10px] font-bold text-muted-foreground uppercase px-1">
            Current Languages
          </span>
          {tempLanguages.length === 0 ? (
            <span className="text-xs text-muted-foreground italic p-2">
              No languages added yet.
            </span>
          ) : (
            tempLanguages.map((lang, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white dark:bg-zinc-700/60 p-2 rounded border border-border/40 text-foreground"
              >
                <div className="text-xs md:text-sm text-[#191c1e] dark:text-white">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-xs text-muted-foreground ml-1.5">
                    ({lang.level})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveTempLanguage(idx)}
                  className="p-1 text-[#ba1a1a] hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors cursor-pointer"
                  aria-label={`Remove ${lang.name}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add New Language Section */}
        <div className="border-t border-border pt-3">
          <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-2">
            Add Language
          </span>
          <div className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-6">
              <input
                type="text"
                placeholder="Language (e.g. French)"
                value={newLangForm.name}
                onChange={(e) =>
                  setNewLangForm({ ...newLangForm, name: e.target.value })
                }
                className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-1.5 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white"
              />
            </div>
            <div className="col-span-4">
              <select
                value={newLangForm.level}
                onChange={(e) =>
                  setNewLangForm({ ...newLangForm, level: e.target.value })
                }
                className="w-full bg-[#f8f9fc] dark:bg-zinc-800 text-[#191c1e] dark:text-white border border-input px-3 py-1.5 rounded-lg text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-white cursor-pointer"
              >
                <option>Basic</option>
                <option>Intermediate</option>
                <option>Fluent</option>
                <option>Native</option>
              </select>
            </div>
            <div className="col-span-2">
              <button
                type="button"
                onClick={handleAddTempLanguage}
                className="w-full bg-primary hover:bg-[#355B44] text-white py-1.5 rounded-lg text-xs font-semibold cursor-pointer text-center"
              >
                Add
              </button>
            </div>
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
