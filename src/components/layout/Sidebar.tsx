import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Link, useLocation } from '@tanstack/react-router'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Characters', href: '/characters' },
  {
    label: 'Rules',
    children: [
      { label: 'Classes', href: '/rules/classes' },
      { label: 'Races', href: '/rules/races' },
      { label: 'Backgrounds', href: '/rules/backgrounds' },
      { label: 'Feats', href: '/rules/feats' },
      { label: 'Spells', href: '/rules/spells' },
      { label: 'Items', href: '/rules/items' },
      { label: 'Monsters', href: '/rules/monsters' },
    ],
  },
]

export function Sidebar() {
  const [isRulesOpen, setIsRulesOpen] = useState(false)
  const location = useLocation()

  // Ouvrir automatiquement Rules si on est sur une page de rules
  useEffect(() => {
    if (location.pathname.startsWith('/rules')) {
      setIsRulesOpen(true)
    }
  }, [location.pathname])

  const isActive = (href: string) => {
    if (href === '/characters') {
      return location.pathname === '/characters'
    }
    // Pour les routes de rules, vérifier si le chemin commence par le href
    if (href.startsWith('/rules')) {
      return location.pathname.startsWith(href)
    }
    return location.pathname === href
  }

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar p-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <nav className="flex flex-col gap-1">
        {navItems.map(item => {
          if (item.children) {
            const hasActiveChild = item.children.some(child =>
              isActive(child.href)
            )

            return (
              <Collapsible
                key={item.label}
                open={isRulesOpen}
                onOpenChange={setIsRulesOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      hasActiveChild && 'bg-sidebar-accent text-sidebar-accent-foreground'
                    )}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isRulesOpen && 'transform rotate-180'
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1">
                  <div className="flex flex-col gap-0.5 ml-2">
                    {item.children.map(child => {
                      const active = isActive(child.href)
                      return (
                        <Link to={child.href} key={child.label}>
                          <Button
                            variant="ghost"
                            className={cn(
                              'w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors',
                              active && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                            )}
                          >
                            {child.label}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          }

          const active = isActive(item.href)
          return (
            <Link to={item.href} key={item.label}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors',
                  active && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                )}
              >
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
