import { logout } from '@/lib/auth/auth.logout'

export function useLogout() {
  return () => {
    logout()
  }
}
