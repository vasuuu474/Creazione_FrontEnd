import { useUIStore } from '@/store/useUIStore'
import { useProfileStore } from '@/store/useProfileStore'

export function useSkillsEditing() {
  const skills = useProfileStore((state) => state.skills)
  const saveSkills = useProfileStore((state) => state.saveSkills)
  const openModal = useUIStore((state) => state.openModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const showToast = useUIStore((state) => state.showToast)

  const requestEdit = () => {
    openModal('edit-skills')
  }

  const handleSave = (updatedSkills) => {
    saveSkills(updatedSkills)
    closeModal()
    showToast('Professional skills updated successfully.')
  }

  return { skills, requestEdit, handleSave }
}
