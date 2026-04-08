import { useParams, useNavigate } from 'react-router-dom'
import { useStudentById } from '../hooks/useStudents'
import { useOrdersByStudent } from '../hooks/useOrders'
import { useSnacks } from '../hooks/useSnacks'
import { useModal } from '../context/ModalContext'
import { Loader } from '../components/Loader'
import { ErrorState } from '../components/ErrorState'
import { EmptyState } from '../components/EmptyState'
import { Button } from '../components/Button'
import { formatCurrency, formatDate } from '../utils/format'

export function StudentDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { openModal } = useModal()

  const {
    data: student,
    isLoading: studentLoading,
    isError: studentError,
    refetch: refetchStudent,
  } = useStudentById(id)

  const { data: orders = [], isLoading: ordersLoading } = useOrdersByStudent(id)
  const { data: snacks = [] } = useSnacks()

  const getSnackName = (snackId: string) =>
    snacks.find((s) => s.id === snackId)?.name ?? 'Unknown'

  if (studentLoading) return <Loader text="Loading student..." />
  if (studentError || !student)
    return (
      <ErrorState
        message="Student not found."
        onRetry={refetchStudent}
      />
    )

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Back */}
      <button
        onClick={() => navigate('/students')}
        className="mb-5 flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 focus:outline-none focus:underline"
        aria-label="Back to students list"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Students
      </button>

      {/* Profile card */}
      <div className="mb-6 rounded border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-gray-900">{student.name}</h1>
            <p className="text-sm text-gray-500">
              Referral Code:{' '}
              <span className="font-mono font-semibold text-gray-700">{student.referralCode}</span>
            </p>
            <p className="text-sm text-gray-600">
              Total Spent:{' '}
              <span className="font-semibold text-gray-900">{formatCurrency(student.totalSpent)}</span>
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => openModal(undefined, student)}
            aria-label={`Place new order for ${student.name}`}
          >
            Place New Order
          </Button>
        </div>
      </div>

      {/* Orders */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-gray-900">Order History</h2>

        {ordersLoading ? (
          <Loader text="Loading orders..." />
        ) : orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="This student hasn't placed any orders."
            action={{ label: 'Place First Order', onClick: () => openModal(undefined, student) }}
          />
        ) : (
          <div className="overflow-x-auto rounded border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Snack</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Qty</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Amount</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...orders].reverse().map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-900">{getSnackName(order.snackId)}</td>
                    <td className="px-4 py-3 text-gray-600">{order.quantity}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(order.amount)}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
