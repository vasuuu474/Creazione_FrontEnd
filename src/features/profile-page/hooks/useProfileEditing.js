import { useUIStore } from '@/store/useUIStore'
import { useProfileStore } from '@/store/useProfileStore'
import { useAuthStore } from '@/store/useAuthStore'

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
    
    // Sync with auth store to update headers globally
    const currentUser = useAuthStore.getState().currentUser
    useAuthStore.getState().setUser({
      ...currentUser,
      avatar: updatedProfile.avatar,
      name: updatedProfile.name
    })

    closeModal()
    showToast('Profile details updated successfully.')
  }

  return { profile, requestEdit, handleSave }
}
