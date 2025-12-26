import { useQueryClient } from '@tanstack/react-query'
import type { AuthUser } from '@/services/auth/auth.service'

export function useAuth(): AuthUser | undefined {
  const queryClient = useQueryClient()
  return queryClient.getQueryData<AuthUser>(['me'])
}

