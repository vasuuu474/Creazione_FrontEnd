import { Check, UserMinus } from 'lucide-react'
import { useIsFounder } from '../../hooks/useIsFounder'
import { useProjectStore } from '@/store/useProjectStore'
import { useMembersStore } from '@/store/useMembersStore'
import { useUIStore } from '@/store/useUIStore'

export default function TeamMember({ member }) {
  const { id, name, role, avatar, tag } = member
  const isFounder = useIsFounder()
  const showToast = useUIStore((state) => state.showToast)

  return (
    <div className="flex items-center justify-between py-3 border-b border-brand-border/60 last:border-0 last:pb-0 group">
      
      {/* Left side: Avatar and Names */}
      <div className="flex items-center gap-3">
        <img 
          src={avatar} 
          alt={name} 
          className="w-11 h-11 rounded-md object-cover border border-brand-border shadow-sm"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
          }}
        />
        <div>
          <h4 className="text-sm font-bold text-brand-primary leading-tight">{name}</h4>
          <p className="text-xs text-brand-text-muted mt-0.5 font-medium">{role}</p>
          
          {/* Custom Check Badge */}
          {tag && (
            <span className="inline-flex items-center gap-1 bg-gray-100 text-brand-text-muted text-[9px] font-bold px-2 py-0.5 rounded-full mt-1.5 border border-brand-border">
              <Check className="w-2.5 h-2.5 text-brand-primary-container stroke-[3]" />
              <span>{tag}</span>
            </span>
          )}
        </div>
      </div>

      {/* Right side: Delete/Remove link on hover for Founder */}
      {isFounder && (
        <button
          onClick={() => {
            useProjectStore.getState().removeMemberFromProject(id)
            useMembersStore.getState().removeMember(id)
            showToast(`Removed member ${name} from project.`)
          }}
          className="hidden group-hover:flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-bold transition-colors cursor-pointer p-2 hover:bg-red-50 rounded-lg"
          title="Remove Member"
        >
          <UserMinus className="w-4 h-4" />
        </button>
      )}

    </div>
  )
}
