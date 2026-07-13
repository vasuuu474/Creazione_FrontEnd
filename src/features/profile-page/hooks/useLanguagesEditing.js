import { useUIStore } from '@/store/useUIStore'
import { useProfileStore } from '@/store/useProfileStore'

export function useLanguagesEditing() {
  const languages = useProfileStore((state) => state.languages)
  const saveLanguages = useProfileStore((state) => state.saveLanguages)
  const openModal = useUIStore((state) => state.openModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const showToast = useUIStore((state) => state.showToast)

  const requestEdit = () => {
    openModal('edit-languages')
  }

  const handleSave = (updatedLanguages) => {
    saveLanguages(updatedLanguages)
    closeModal()
    showToast('Languages updated successfully.')
  }

  return { languages, requestEdit, handleSave }
}
