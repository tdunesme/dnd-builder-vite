import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

const navItems = [
  { label: 'Characters', href: '/characters' },
  { label: 'Create Character', href: '/builder/name' },
]

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-muted/40 p-4">
      <nav className="flex flex-col gap-2">
        {navItems.map(item => (
          <Link to={item.href} key={item.label}>
            <Button variant="ghost" className={cn('justify-start')}>
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
