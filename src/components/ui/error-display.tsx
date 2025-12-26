type ErrorDisplayProps = {
  error: Error | unknown
  title?: string
}

export function ErrorDisplay({ error, title = 'Error' }: ErrorDisplayProps) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'An unexpected error occurred'

  return (
    <div className="p-6 text-destructive">
      <h2 className="font-semibold mb-2">{title}</h2>
      <p>{errorMessage}</p>
    </div>
  )
}

