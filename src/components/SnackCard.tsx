import { Snack } from '../types'
import { formatCurrency } from '../utils/format'
import { useModal } from '../context/ModalContext'
import { Button } from './Button'

interface SnackCardProps {
  snack: Snack
}

export function SnackCard({ snack }: SnackCardProps) {
  const { openModal } = useModal()

  return (
    <div className="flex flex-col justify-between rounded border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow">
      <div className="mb-4 space-y-1">
        <h3 className="text-base font-semibold text-gray-900">{snack.name}</h3>
        <p className="text-xl font-bold text-blue-600">{formatCurrency(snack.price)}</p>
        <p className="text-xs text-gray-500">
          <span className="mr-1 inline-block rounded bg-gray-100 px-1.5 py-0.5 font-medium text-gray-600">
            {snack.ordersCount}
          </span>
          {snack.ordersCount === 1 ? 'order' : 'orders'} 
        </p>
      </div>
      <Button
        variant="primary"
        size="md"
        onClick={() => openModal(snack)}
        aria-label={`Order ${snack.name}`}
      >
        Order
      </Button>
    </div>
  )
}
