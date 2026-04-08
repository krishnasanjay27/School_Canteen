import { useRecentOrders } from '../hooks/useOrders'
import { useSnacks } from '../hooks/useSnacks'
import { useStudents } from '../hooks/useStudents'
import { EmptyState } from './EmptyState'
import { formatDate } from '../utils/format'
import { Order } from '../types'
import { useState } from 'react'

export function RecentOrders() {
  const [isExpanded, setIsExpanded] = useState(true)
  const { data: recentOrders = [] } = useRecentOrders()
  const { data: snacks = [] } = useSnacks()
  const { data: students = [] } = useStudents()

  const getSnackName = (id: string) => snacks.find((s) => s.id === id)?.name ?? 'Unknown Snack'
  const getStudentName = (id: string) => students.find((s) => s.id === id)?.name ?? 'Unknown Student'

  return (
    <section className="mb-8" aria-labelledby="recent-orders-heading">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="recent-orders-heading" className="text-lg font-semibold text-gray-900">
          Recent Orders
        </h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:underline"
          aria-expanded={isExpanded}
          aria-controls="recent-orders-content"
        >
          {isExpanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {isExpanded && (
        <div id="recent-orders-content" className="rounded-md border border-gray-200 bg-white shadow-sm overflow-hidden">
        {recentOrders.length === 0 ? (
          <EmptyState 
            title="No recent orders" 
            description="Orders placed will appear here." 
          />
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentOrders.map((order: Order) => (
              <li key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-gray-50 transition-colors gap-2 sm:gap-0">
                <div className="text-sm">
                  <span className="font-medium text-gray-900">{getStudentName(order.studentId)}</span>
                  {' '}ordered{' '}
                  <span className="font-medium text-gray-900">
                    {getSnackName(order.snackId)} &times;{order.quantity}
                  </span>
                </div>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  {formatDate(order.createdAt)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      )}
    </section>
  )
}
