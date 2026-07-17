import { useUIStore } from '@/store/useUIStore'
import { useProfileStore } from '@/store/useProfileStore'
import { useProjectStore } from '@/store/useProjectStore'
import { useNavigate } from 'react-router-dom'

export function useProjectsActions() {
  const navigate = useNavigate()
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
    if (activeTab === 'created') {
      // Create the project idea globally so they are founder,
      // which automatically adds it to their profile under "created"
      useProjectStore.getState().publishIdea(newProject.title, newProject.description, null, newProject.skills)
      navigate('/workspace')
    } else {
      addProject(newProject)
    }
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

  const handleProjectClick = (proj) => {
    useProjectStore.getState().setActiveProject(proj)
    navigate('/workspace')
  }

  return {
    activeTab,
    projects: projectsList[activeTab] || [],
    setActiveTab,
    requestAddProject,
    handleAddProject,
    handleToggleVisibility,
    handleProjectClick,
  }
}

