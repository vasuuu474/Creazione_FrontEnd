import { create } from 'zustand'
import { initialProjectData } from '@/data/mock/projectData'
import { getProject, updateProject } from '@/api/endpoints/projectApi'

export const useProjectStore = create((set, get) => ({
  project: initialProjectData,
  status: 'idle', // 'idle' | 'loading'
  error: null,

  // No backend is wired up yet, so a failed request just leaves the seeded
  // mock data in place instead of surfacing an error state to the user.
  fetchProject: async () => {
    set({ status: 'loading', error: null })
    try {
      const project = await getProject()
      set({ project, status: 'idle' })
    } catch (err) {
      set({ status: 'idle', error: err.message })
    }
  },

  saveProjectEdits: async (edits) => {
    const next = { ...get().project, ...edits }
    set({ project: next })
    try {
      await updateProject(next)
    } catch (err) {
      set({ error: err.message })
    }
  },

  publishIdea: (title, description) => {
    set((state) => ({
      project: {
        ...state.project,
        title,
        scopeParagraphs: [description || 'No description provided.'],
        scopeBullets: [],
        phase: 'IDEATION',
      },
    }))
  },

  syncMemberIntoProject: (memberId, patch) =>
    set((state) => ({
      project: {
        ...state.project,
        members: state.project.members.map((m) => (m.id === memberId ? { ...m, ...patch } : m)),
      },
    })),

  removeMemberFromProject: (memberId) =>
    set((state) => ({
      project: {
        ...state.project,
        members: state.project.members.filter((m) => m.id !== memberId),
        totalMembersCount: Math.max(0, state.project.totalMembersCount - 1),
      },
    })),

  addMemberToProjectIfRoom: (member) =>
    set((state) => {
      const members =
        state.project.members.length < 2 ? [...state.project.members, member] : state.project.members
      return {
        project: {
          ...state.project,
          members,
          totalMembersCount: state.project.totalMembersCount + 1,
        },
      }
    }),
}))
