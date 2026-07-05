import React from 'react'

export default function ProjectScopeCard({
  scopeTitle,
  scopeParagraphs,
  isEditing,
  editState,
  setEditState
}) {
  if (isEditing) {
    const handleTitleChange = (e) => {
      setEditState({ ...editState, scopeTitle: e.target.value })
    }

    return (
      <div className="bg-white border border-[#e1e4ea] rounded-[16px] p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-brand-primary mb-4 select-none">
          Edit Project Scope
        </h3>
        <div className="space-y-4">
          
          {/* Scope Title */}
          <div>
            <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase mb-1">Scope Section Title</label>
            <input
              type="text"
              value={editState.scopeTitle}
              onChange={handleTitleChange}
              className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all font-serif font-bold text-brand-primary"
              placeholder="e.g. Detailed Project Scope"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-[11px] font-extrabold tracking-wider text-brand-primary uppercase">Description</label>
            <textarea
              value={editState.scopeParagraphs.join('\n\n')}
              onChange={(e) => {
                const paragraphs = e.target.value.split(/\n\s*\n/);
                setEditState({ ...editState, scopeParagraphs: paragraphs });
              }}
              className="w-full text-sm border border-brand-border rounded-[4px] px-3 py-2 bg-brand-bg focus:outline-none focus:ring-1 focus:ring-[#1b3022] focus:bg-white transition-all min-h-[150px]"
              placeholder="Enter project description..."
            />
          </div>

        </div>
      </div>
    )
  }

  // Normal view mode
  return (
    <div className="bg-white border border-[#e1e4ea] rounded-[16px] p-8 shadow-sm">
      {/* Title */}
      <h2 className="font-serif text-[22px] font-bold text-brand-primary mb-4 leading-normal select-none">
        {scopeTitle}
      </h2>
      
      {/* Divider */}
      <div className="h-[1px] bg-brand-border my-5" />

      {/* Paragraphs */}
      <div className="space-y-6">
        {scopeParagraphs.map((paragraph, index) => (
          <p 
            key={index} 
            className="text-[15px] leading-7 text-[#434843] font-medium"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
