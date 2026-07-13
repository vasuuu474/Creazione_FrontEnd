import { useUIStore } from '@/store/useUIStore'
import { useProfileStore } from '@/store/useProfileStore'

export function useProfileEditing() {
  const profile = useProfileStore((state) => state.profile)
  const saveProfileEdits = useProfileStore((state) => state.saveProfileEdits)
  const openModal = useUIStore((state) => state.openModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const showToast = useUIStore((state) => state.showToast)

  const requestEdit = () => {
    openModal('edit-profile')
  }

  const handleSave = (updatedProfile) => {
    saveProfileEdits(updatedProfile)
    closeModal()
    showToast('Profile details updated successfully.')
  }

  return { profile, requestEdit, handleSave }
}
