import { useMembersStore } from '@/store/useMembersStore'
import { useProjectStore } from '@/store/useProjectStore'

// The team roster (useMembersStore) and the project's displayed member
// slots (useProjectStore) are two separate concerns that still need to
// stay in sync on every roster change - this hook is the one place that
// composes them, instead of every caller re-deriving the sync logic.
export function useTeamActions() {
  const addMemberToRoster = useMembersStore((state) => state.addMember)
  const updateMemberRoleInRoster = useMembersStore((state) => state.updateMemberRole)
  const removeMemberFromRoster = useMembersStore((state) => state.removeMember)

  const syncMemberIntoProject = useProjectStore((state) => state.syncMemberIntoProject)
  const removeMemberFromProject = useProjectStore((state) => state.removeMemberFromProject)
  const addMemberToProjectIfRoom = useProjectStore((state) => state.addMemberToProjectIfRoom)

  const updateMemberRole = async (memberId, patch) => {
    await updateMemberRoleInRoster(memberId, patch)
    syncMemberIntoProject(memberId, patch)
  }

  const removeMember = async (memberId) => {
    await removeMemberFromRoster(memberId)
    removeMemberFromProject(memberId)
  }

  const addMember = async (memberInput) => {
    const member = await addMemberToRoster(memberInput)
    addMemberToProjectIfRoom(member)
    return member
  }

  return { updateMemberRole, removeMember, addMember }
}
