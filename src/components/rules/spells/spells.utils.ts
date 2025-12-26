export function getLevelLabel(level: number): string {
  if (level === 0) return 'Cantrip'
  return `Level ${level}`
}

export function getComponentIcon(component: string): string {
  switch (component) {
    case 'V':
      return '🗣️'
    case 'S':
      return '✋'
    case 'M':
      return '💎'
    default:
      return component
  }
}

