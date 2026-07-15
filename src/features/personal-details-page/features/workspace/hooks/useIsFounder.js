import { useAuthStore } from '@/store/useAuthStore'
import { useProjectStore } from '@/store/useProjectStore'

export function useIsFounder() {
  const currentUserEmail = useAuthStore((state) => state.currentUser.email)
  const founderEmail = useProjectStore((state) => state.project.founder.email)
  return currentUserEmail === founderEmail
}
