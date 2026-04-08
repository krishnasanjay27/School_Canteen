import { useSnacks } from '../hooks/useSnacks'
import { SnackCard } from '../components/SnackCard'
import { Loader } from '../components/Loader'
import { ErrorState } from '../components/ErrorState'
import { EmptyState } from '../components/EmptyState'

export function SnacksPage() {
  const { data: snacks, isLoading, isError, refetch } = useSnacks()

  if (isLoading) return <Loader text="Loading snacks..." />
  if (isError) return <ErrorState message="Failed to load snacks." onRetry={refetch} />

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Snacks</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse available snacks and place an order.
        </p>
      </div>

      {!snacks || snacks.length === 0 ? (
        <EmptyState
          title="No snacks available"
          description="The canteen menu is currently empty."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {snacks.map((snack) => (
            <SnackCard key={snack.id} snack={snack} />
          ))}
        </div>
      )}
    </main>
  )
}
