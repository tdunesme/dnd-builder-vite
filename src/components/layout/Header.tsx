import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Link } from '@tanstack/react-router'
import { useLogout } from '@/hooks/auth/useLogout'
import { useAuth } from '@/hooks/auth/useAuth'

export function Header() {
  const logout = useLogout()
  const user = useAuth()
  const isAuthenticated = !!user
  const userInitial =
    (user?.firstName?.charAt(0) ?? '') + (user?.lastName?.charAt(0) ?? '')
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">D&D Builder</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <ModeToggle />

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={logout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Se connecter</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/signup">Créer un compte</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
