import { create } from 'zustand'
import { allMockMembers } from '@/data/mock/projectData'
import { fetchMembers, createMember, updateMember, deleteMember } from '@/api/endpoints/membersApi'

export const useMembersStore = create((set, get) => ({
  members: allMockMembers,
  status: 'idle', // 'idle' | 'loading'

  loadMembers: async () => {
    set({ status: 'loading' })
    try {
      const members = await fetchMembers()
      set({ members, status: 'idle' })
    } catch {
      // No backend yet — keep the seeded mock roster.
      set({ status: 'idle' })
    }
  },

  addMember: async (memberInput) => {
    const optimisticMember = { id: String(get().members.length + 1), ...memberInput }
    set((state) => ({ members: [...state.members, optimisticMember] }))
    try {
      await createMember(optimisticMember)
    } catch {
      // keep the optimistic member — no backend to confirm against yet
    }
    return optimisticMember
  },

  updateMemberRole: async (id, patch) => {
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    }))
    try {
      await updateMember(id, patch)
    } catch {
      // optimistic update stands
    }
  },

  removeMember: async (id) => {
    set((state) => ({ members: state.members.filter((m) => m.id !== id) }))
    try {
      await deleteMember(id)
    } catch {
      // optimistic removal stands
    }
  },
}))
