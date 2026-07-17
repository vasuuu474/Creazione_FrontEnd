import { Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function EditWorkspaceHeaderForm({ editState, setEditState, onSave, onCancel, onDelete }) {
  return (
    <div className="bg-white border border-[#e1e4ea] rounded-[16px] p-6 shadow-sm mb-6 space-y-4">
      <div className="flex items-center justify-between border-b border-brand-border pb-3">
        <h2 className="font-serif text-lg font-bold text-brand-primary select-none">
          Edit Workspace Settings
        </h2>
        <div className="flex items-center gap-2">
          {onDelete && (
            <Button
              type="button"
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-[4px] inline-flex items-center gap-1.5 cursor-pointer uppercase mr-2"
            >
              <span>Delete Project</span>
            </Button>
          )}
          <Button
            onClick={onSave}
            className="bg-[#1b3022] hover:bg-[#122017] text-white text-xs font-bold px-4 py-2 rounded-[4px] inline-flex items-center gap-1.5 cursor-pointer uppercase"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </Button>
          <Button
            onClick={onCancel}
            className="bg-white hover:bg-gray-50 text-brand-text border border-brand-border text-xs font-bold px-4 py-2 rounded-[4px] inline-flex items-center gap-1.5 cursor-pointer uppercase"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Project Idea Title</label>
          <input
            type="text"
            value={editState.title}
            onChange={(e) => setEditState({ ...editState, title: e.target.value })}
            className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all font-semibold"
          />
        </div>
      </div>
    </div>
  )
}
