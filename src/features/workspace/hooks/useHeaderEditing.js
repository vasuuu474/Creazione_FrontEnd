import { useUIStore } from '@/store/useUIStore'
import { useProjectStore } from '@/store/useProjectStore'
import { useIsFounder } from './useIsFounder'

// Guards the inline "edit workspace header" form behind the founder role,
// and lets any trigger (Navbar menu item, Sidebar settings button) share
// the same access-check + toast behavior instead of duplicating it.
export function useHeaderEditing() {
  const isFounder = useIsFounder()
  const project = useProjectStore((state) => state.project)
  const isEditingHeader = useUIStore((state) => state.isEditingHeader)
  const headerEditDraft = useUIStore((state) => state.headerEditDraft)
  const setHeaderEditDraft = useUIStore((state) => state.setHeaderEditDraft)
  const startEditHeader = useUIStore((state) => state.startEditHeader)
  const stopEditHeader = useUIStore((state) => state.stopEditHeader)
  const showToast = useUIStore((state) => state.showToast)

  const requestEditHeader = () => {
    if (!isFounder) {
      showToast('Access Denied: Only the Project Founder can edit settings.')
      return
    }
    startEditHeader({
      title: project.title,
      phase: project.phase,
      scopeTitle: project.scopeTitle,
      scopeParagraphs: [...project.scopeParagraphs],
      scopeBullets: [...(project.scopeBullets || [])],
      tags: [...project.tags],
    })
  }

  return { isEditingHeader, headerEditDraft, setHeaderEditDraft, requestEditHeader, stopEditHeader }
}
