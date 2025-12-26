import { useSpells } from '@/hooks/rules/useSpells'
import { SpellsTable } from '@/components/rules/spells/SpellsTable'
import { ErrorDisplay } from '@/components/ui/error-display'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState, useMemo } from 'react'

export function SpellsPage() {
  const { data, isLoading, isError, error } = useSpells()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    if (!data || !searchTerm) return data
    return data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [data, searchTerm])

  if (isError) return <ErrorDisplay error={error} />

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Spells</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore the collection of spells
          </p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            type="text"
            placeholder="Search for a spell..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : !filteredData?.length ? (
        <div>No spells found</div>
      ) : (
        <div className="flex-1 min-h-0">
          <SpellsTable data={filteredData} />
        </div>
      )}
    </div>
  )
}
