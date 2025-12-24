import { useCharacters } from '@/queries/useCharacters'

export function CharactersPage() {
  const { data, isLoading, isError, error } = useCharacters()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error : {(error as Error).message}</div>
  }

  if (!data || data.length === 0) {
    return <div>No characters found</div>
  }

  return (
    <ul className="space-y-2">
      {data.map(character => (
        <li key={character.id} className="border rounded p-3 hover:bg-muted">
          <div className="font-medium">{character.name}</div>
          <div className="text-sm text-muted-foreground">
            Level {character.level} — {character.classIndex}
          </div>
        </li>
      ))}
    </ul>
  )
}
