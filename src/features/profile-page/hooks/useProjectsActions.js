import { useUIStore } from '@/store/useUIStore'
import { useProfileStore } from '@/store/useProfileStore'

export function useProjectsActions() {
  const activeTab = useProfileStore((state) => state.activeTab)
  const projectsList = useProfileStore((state) => state.projectsList)
  const setActiveTab = useProfileStore((state) => state.setActiveTab)
  const addProject = useProfileStore((state) => state.addProject)
  const toggleProjectVisibility = useProfileStore((state) => state.toggleProjectVisibility)

  const openModal = useUIStore((state) => state.openModal)
  const closeModal = useUIStore((state) => state.closeModal)
  const showToast = useUIStore((state) => state.showToast)

  const requestAddProject = () => {
    openModal('add-project')
  }

  const handleAddProject = (newProject) => {
    addProject(newProject)
    closeModal()
    const tabName =
      activeTab === 'created'
        ? 'Created'
        : activeTab === 'worked'
        ? 'Worked On'
        : 'Invested'
    showToast(`Project "${newProject.title}" added to ${tabName} list.`)
  }

  const handleToggleVisibility = (projectId) => {
    toggleProjectVisibility(projectId)
  }

  return {
    activeTab,
    projects: projectsList[activeTab] || [],
    setActiveTab,
    requestAddProject,
    handleAddProject,
    handleToggleVisibility,
  }
}
