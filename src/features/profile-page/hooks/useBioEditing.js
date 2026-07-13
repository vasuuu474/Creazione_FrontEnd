import { useUIStore } from '@/store/useUIStore'
import { useProfileStore } from '@/store/useProfileStore'

export function useBioEditing() {
  const bioText = useProfileStore((state) => state.bioText)
  const saveBio = useProfileStore((state) => state.saveBio)
  const openModal = useUIStore((state) => state.openModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const showToast = useUIStore((state) => state.showToast)

  const requestEdit = () => {
    openModal('edit-bio')
  }

  const handleSave = (updatedBioText) => {
    saveBio(updatedBioText)
    closeModal()
    showToast('Biography updated successfully.')
  }

  return { bioText, requestEdit, handleSave }
}
