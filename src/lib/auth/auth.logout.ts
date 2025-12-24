import { queryClient } from '@/lib/query/queryClient'
import { router } from '@/router'
import { clearAccessToken } from './auth.storage'
import { toast } from 'sonner'

export async function logout() {
  clearAccessToken()

  queryClient.clear()

  toast.success('You have been logged out', {
    description: 'You have been logged out successfully.',
  })

  await router.navigate({
    to: '/auth/login',
    replace: true,
  })
}
