import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

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

  return (
    <aside className="w-64 border-r bg-muted/40 p-4">
      <nav className="flex flex-col gap-2">
        {navItems.map(item => {
          if (item.children) {
            return (
              <Collapsible
                key={item.label}
                open={isRulesOpen}
                onOpenChange={setIsRulesOpen}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn('w-full justify-between')}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isRulesOpen && 'transform rotate-180'
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-1">
                  <div className="flex flex-col gap-1 ml-4">
                    {item.children.map(child => (
                      <Link to={child.href} key={child.label}>
                        <Button
                          variant="ghost"
                          className={cn('w-full justify-start')}
                        >
                          {child.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          }

          return (
            <Link to={item.href} key={item.label}>
              <Button variant="ghost" className={cn('w-full justify-start')}>
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
