import { LayoutDashboard, Users, Settings, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/useUIStore'
import { useIsFounder } from '../../hooks/useIsFounder'
import { useHeaderEditing } from '../../hooks/useHeaderEditing'

export default function Sidebar() {
  const activeView = useUIStore((state) => state.activeView)
  const setActiveView = useUIStore((state) => state.setActiveView)
  const openModal = useUIStore((state) => state.openModal)
  const isFounder = useIsFounder()
  const { requestEditHeader } = useHeaderEditing()

  const menuItems = [
    { id: 'workspace', label: 'Workspace', icon: LayoutDashboard, action: () => setActiveView('workspace') },
    { id: 'members', label: 'Members', icon: Users, action: () => openModal('members-roster') },
    ...(isFounder ? [{ id: 'settings', label: 'Settings', icon: Settings, action: requestEditHeader }] : []),
    { id: 'help', label: 'Help', icon: HelpCircle, action: () => openModal('help') },
  ]

  return (
    <aside className="w-72 bg-[#f8f9fc] border-r border-brand-border h-[calc(100vh-64px)] flex flex-col p-6 sticky top-16 select-none">

      {/* Navigation Menu */}
      <nav className="space-y-1.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeView === item.id

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer text-left",
                isActive
                  ? "bg-[#1b3022] text-white shadow-sm shadow-[#1b3022]/10"
                  : "text-brand-text-muted hover:bg-gray-200/60 hover:text-brand-primary"
              )}
            >
              <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "text-gray-500")} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer / Border decoration */}
      <div className="border-t border-brand-border/60 pt-4 mt-auto">
        <p className="text-[10px] text-center text-brand-text-muted font-medium">Creazione Workspace v1.0.0</p>
      </div>

    </aside>
  )
}
