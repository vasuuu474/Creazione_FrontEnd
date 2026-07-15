import { create } from 'zustand'
import { initialProfileData } from '@/data/mock/profileData'
import { getProfile, updateProfile } from '@/api/endpoints/profileApi'

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
      // fallback to mock data
      set({ status: 'idle' })
    }
  },

  saveProfileEdits: async (edits) => {
    const nextProfile = { ...get().profile, ...edits }
    set({ profile: nextProfile })
    try {
      await updateProfile({ profile: nextProfile })
    } catch (err) {
      set({ error: err.message })
    }
  },

  saveBio: async (bioText) => {
    set({ bioText })
    try {
      await updateProfile({ bioText })
    } catch (err) {
      set({ error: err.message })
    }
  },

  saveLanguages: async (languages) => {
    set({ languages })
    try {
      await updateProfile({ languages })
    } catch (err) {
      set({ error: err.message })
    }
  },

  saveSkills: async (skills) => {
    set({ skills })
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
      [activeTab]: [...projectsList[activeTab], project],
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
