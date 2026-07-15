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

  // `founder` is optional so Workspace's existing CreateIdeaModal call
  // (publishIdea(title, description)) keeps working unchanged. Home's
  // "Create a New Idea" flow passes the current user as founder, which is
  // what makes useIsFounder() return true for them on the Workspace page.
  publishIdea: (title, description, founder) => {
    set((state) => ({
      project: {
        ...state.project,
        title,
        scopeParagraphs: [description || 'No description provided.'],
        scopeBullets: [],
        phase: 'IDEATION',
        ...(founder ? { founder } : {}),
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

  joinProjectUpdateStore: (title, description, tags) =>
    set((state) => ({
      project: {
        ...state.project,
        title,
        scopeParagraphs: [description || 'No description provided.'],
        scopeBullets: [],
        tags: tags ? tags.map((t) => t.toUpperCase()) : [],
        phase: 'IDEATION',
      },
    })),

  addJoinRequest: (member) =>
    set((state) => {
      const pending = state.project.pendingRequests || []
      const exists = pending.some((r) => r.id === member.id)
      if (exists) return {}
      return {
        project: {
          ...state.project,
          pendingRequests: [...pending, member],
        },
      }
    }),

  acceptJoinRequest: (memberId) =>
    set((state) => {
      const pending = state.project.pendingRequests || []
      const request = pending.find((r) => r.id === memberId)
      if (!request) return {}
      const members = [...state.project.members, {
        id: request.id,
        name: request.name,
        avatar: request.avatar,
        role: request.role || 'Contributor',
        tag: 'New Member',
      }]
      return {
        project: {
          ...state.project,
          members,
          totalMembersCount: state.project.totalMembersCount + 1,
          pendingRequests: pending.filter((r) => r.id !== memberId),
        },
      }
    }),

  declineJoinRequest: (memberId) =>
    set((state) => ({
      project: {
        ...state.project,
        pendingRequests: (state.project.pendingRequests || []).filter((r) => r.id !== memberId),
      },
    })),
}))
