import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initialProjectData } from '@/data/mock/projectData'
import { projects as initialAllProjects } from '@/features/home-page/data/projects'
import { getProject, updateProject } from '@/api/endpoints/projectApi'
import { useAuthStore } from '@/store/useAuthStore'
import { useProfileStore } from '@/store/useProfileStore'

export const useProjectStore = create(
  persist(
    (set, get) => ({
      project: initialProjectData,
      allProjects: initialAllProjects,   // dynamic home page projects list
      status: 'idle', // 'idle' | 'loading'
      error: null,

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

      publishIdea: (title, description, founder, skills = []) => {
        // Prevent duplicate ideas with identical titles and descriptions
        const allProjs = get().allProjects || []
        const isDuplicate = allProjs.some(
          (p) => p.title.toLowerCase() === title.toLowerCase() && p.description.toLowerCase() === description.toLowerCase()
        )
        if (isDuplicate) {
          return
        }

        // Determine the founder — default to logged in user if not passed
        const activeUser = useAuthStore.getState().currentUser
        const projectFounder = founder || {
          name: activeUser.name || 'New User',
          role: activeUser.role || 'Contributor',
          avatar: activeUser.avatar || '',
          email: activeUser.email || '',
        }

        const projectId = `project-${Date.now()}`

        // Clear out members and requests completely for new ideas
        const newProject = {
          ...get().project,
          id: projectId,
          title,
          scopeTitle: '',
          scopeParagraphs: [description || 'No description provided.'],
          scopeBullets: [],
          phase: 'IDEATION',
          founder: projectFounder,
          members: [],          // Newly created ideas have 0 members except founder
          totalMembersCount: 1, // Only the founder count
          pendingRequests: [],  // Starts with no requests
          tags: skills.map((s) => s.toUpperCase()), // Required skills become Stacks & Tags
        }

        set((state) => ({
          project: newProject,
          // Prepend to the Home Page Discover list
          allProjects: [
            {
              id: projectId,
              title,
              description,
              category: ["IDEATION"],
              status: "open",
              members: 1,
              avatars: [projectFounder.avatar],
              bookmarked: false,
              skillsNeeded: skills,
              tags: skills.map((s) => s.toUpperCase()),
              founder: projectFounder, // Lock founder to the creator
            },
            ...state.allProjects,
          ],
        }))

        // Sync to user profile created tab automatically
        useProfileStore.getState().addCreatedProject({
          id: projectId,
          title,
          description,
          isPublic: true,
          iconType: 'default',
          skills: skills,
          founder: projectFounder,
        })
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

      joinProjectUpdateStore: (title, description, tags, founder, joiningUser) =>
        set((state) => {
          const allProjs = get().allProjects || []
          const fullProject = allProjs.find((p) => p.title.toLowerCase() === title.toLowerCase())

          const existingMembers = fullProject?.membersList || []
          const isAlreadyMember = joiningUser ? existingMembers.some((m) => m.id === joiningUser.email) : false
          const newMembers = (joiningUser && !isAlreadyMember)
            ? [...existingMembers, {
              id: joiningUser.email,
              name: joiningUser.name,
              avatar: joiningUser.avatar || '',
              role: joiningUser.role || 'Contributor',
              tag: 'New Member',
            }]
            : existingMembers

          // Update this project in allProjects list
          const updatedProjects = allProjs.map((p) => {
            if (p.title.toLowerCase() === title.toLowerCase()) {
              const baseAvatars = p.avatars || []
              const hasAvatar = joiningUser && baseAvatars.includes(joiningUser.avatar)
              return {
                ...p,
                membersList: newMembers,
                members: newMembers.length + 1,
                avatars: (joiningUser && !hasAvatar) ? [...baseAvatars, joiningUser.avatar] : baseAvatars,
              }
            }
            return p
          })

          return {
            allProjects: updatedProjects,
            project: {
              ...state.project,
              title,
              scopeParagraphs: [description || 'No description provided.'],
              scopeBullets: [],
              tags: tags ? tags.map((t) => t.toUpperCase()) : [],
              phase: 'IDEATION',
              founder: founder || {
                name: "Dr. Aris Thorne",
                role: "Chief Architect",
                avatar: "/src/assets/founder_aris.jpg",
                email: "aris.thorne@creazione.com"
              },
              members: newMembers,
              totalMembersCount: newMembers.length + 1,
              pendingRequests: [],
            }
          }
        }),

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

      setActiveProject: (projectItem) => {
        // Attempt to find the full project details from allProjects
        const allProjs = get().allProjects || []
        const fullProject = allProjs.find((p) => p.id === projectItem.id || p.title.toLowerCase() === projectItem.title.toLowerCase())

        const activeUser = useAuthStore.getState().currentUser
        const finalFounder = fullProject?.founder || projectItem.founder || {
          name: activeUser.name || 'New User',
          role: activeUser.role || 'Contributor',
          avatar: activeUser.avatar || '',
          email: activeUser.email || '',
        }

        // Map skills entered in profile modal or project item categories/skills to tags
        const itemSkills = projectItem.skills || projectItem.skillsNeeded || []
        const finalTags = fullProject?.tags || projectItem.tags || (itemSkills.length > 0 ? itemSkills.map(s => s.toUpperCase()) : [])

        set({
          project: {
            id: projectItem.id,
            title: projectItem.title,
            parentProject: 'Project Alpha',
            parentSubtitle: 'Enterprise Infrastructure',
            phase: fullProject?.phase || projectItem.phase || 'IDEATION',
            updatedText: 'Updated recently',
            scopeTitle: '',
            scopeParagraphs: [fullProject?.description || projectItem.description || 'No description provided.'],
            scopeBullets: [],
            founder: finalFounder,
            members: fullProject?.membersList || projectItem.members || [],
            totalMembersCount: (fullProject?.membersList || projectItem.members || []).length + 1,
            pendingRequests: fullProject?.pendingRequests || projectItem.pendingRequests || [],
            tags: finalTags,
          }
        })
      },

      deleteProject: (projectId) => {
        set((state) => ({
          allProjects: state.allProjects.filter((p) => p.id !== projectId),
        }))
        useProfileStore.getState().deleteProfileProject(projectId)
      },
    }),
    {
      name: 'creazione_project_storage',
    }
  )
)

// Auto-clean any existing duplicate projects in local storage on startup
setTimeout(() => {
  const state = useProjectStore.getState()
  if (state && state.allProjects) {
    const seen = new Set()
    const unique = state.allProjects.filter((p) => {
      const key = `${p.title.trim().toLowerCase()}|${p.description.trim().toLowerCase()}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    if (unique.length !== state.allProjects.length) {
      useProjectStore.setState({ allProjects: unique })
    }
  }
}, 100)


