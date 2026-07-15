import { create } from 'zustand'
import { initialProfileData } from '@/data/mock/profileData'
import { getProfile, updateProfile } from '@/api/endpoints/profileApi'
import { useAuthStore } from '@/store/useAuthStore'

export const useProfileStore = create((set, get) => ({
  profile: initialProfileData.profile,
  bioText: initialProfileData.bioText,
  languages: initialProfileData.languages,
  skills: initialProfileData.skills,
  activeTab: initialProfileData.activeTab,
  projectsList: initialProfileData.projectsList,
  expertise: initialProfileData.expertise,
  status: 'idle',
  error: null,

  fetchProfile: async () => {
    set({ status: 'loading', error: null })
    try {
      const data = await getProfile()
      set({ ...data, status: 'idle' })
    } catch {
      // Fallback: Populate data from the active currentUser in useAuthStore
      const user = useAuthStore.getState().currentUser
      if (user) {
        set({
          profile: {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            location: user.location || '',
            avatar: user.avatar || '',
          },
          bioText: user.bioText || '',
          languages: user.languages || [],
          skills: user.skills || [],
          status: 'idle',
        })
      } else {
        set({ status: 'idle' })
      }
    }
  },

  saveProfileEdits: async (edits) => {
    const nextProfile = { ...get().profile, ...edits }
    set({ profile: nextProfile })
    useAuthStore.getState().setUser(edits)
    try {
      await updateProfile({ profile: nextProfile })
    } catch (err) {
      set({ error: err.message })
    }
  },

  saveBio: async (bioText) => {
    set({ bioText })
    useAuthStore.getState().setUser({ bioText })
    try {
      await updateProfile({ bioText })
    } catch (err) {
      set({ error: err.message })
    }
  },

  saveLanguages: async (languages) => {
    set({ languages })
    useAuthStore.getState().setUser({ languages })
    try {
      await updateProfile({ languages })
    } catch (err) {
      set({ error: err.message })
    }
  },

  saveSkills: async (skills) => {
    set({ skills })
    useAuthStore.getState().setUser({ skills })
    try {
      await updateProfile({ skills })
    } catch (err) {
      set({ error: err.message })
    }
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  addProject: async (project) => {
    const activeTab = get().activeTab
    const projectsList = get().projectsList
    const nextProjects = {
      ...projectsList,
      [activeTab]: [...(projectsList[activeTab] || []), project],
    }
    set({ projectsList: nextProjects })
    try {
      await updateProfile({ projectsList: nextProjects })
    } catch (err) {
      set({ error: err.message })
    }
  },

  toggleSaveProject: async (project) => {
    const projectsList = get().projectsList
    const saved = projectsList.saved || []
    const exists = saved.some((p) => p.id === project.id)
    const updatedSaved = exists
      ? saved.filter((p) => p.id !== project.id)
      : [
          ...saved,
          {
            id: project.id,
            title: project.title,
            description: project.description,
            isPublic: true,
            iconType: "default",
          },
        ]
    const nextProjects = {
      ...projectsList,
      saved: updatedSaved,
    }
    set({ projectsList: nextProjects })
    try {
      await updateProfile({ projectsList: nextProjects })
    } catch (err) {
      set({ error: err.message })
    }
  },

  toggleProjectVisibility: async (projectId) => {
    const activeTab = get().activeTab
    const projectsList = get().projectsList
    const updatedTabList = projectsList[activeTab].map((p) =>
      p.id === projectId ? { ...p, isPublic: !p.isPublic } : p
    )
    const nextProjects = {
      ...projectsList,
      [activeTab]: updatedTabList,
    }
    set({ projectsList: nextProjects })
    try {
      await updateProfile({ projectsList: nextProjects })
    } catch (err) {
      set({ error: err.message })
    }
  },

  updateExpertise: async (expertise) => {
    set({ expertise })
    try {
      await updateProfile({ expertise })
    } catch (err) {
      set({ error: err.message })
    }
  },
}))

// Auto-sync useProfileStore state with useAuthStore's currentUser
useAuthStore.subscribe((state) => {
  const user = state.currentUser
  if (user) {
    useProfileStore.setState({
      profile: {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        avatar: user.avatar || '',
      },
      bioText: user.bioText || '',
      languages: user.languages || [],
      skills: user.skills || [],
    })
  }
})
