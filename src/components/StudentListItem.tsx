import { useNavigate } from 'react-router-dom'
import { Student } from '../types'
import { formatCurrency } from '../utils/format'
import { Button } from './Button'

interface StudentListItemProps {
  student: Student
}

export function StudentListItem({ student }: StudentListItemProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3 rounded border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-0.5">
        <p className="font-medium text-gray-900">{student.name}</p>
        <p className="text-xs text-gray-500">
          Code:{' '}
          <span className="font-mono font-semibold text-gray-700">{student.referralCode}</span>
        </p>
        <p className="text-sm text-gray-600">
          Total Spent:{' '}
          <span className="font-semibold text-gray-900">{formatCurrency(student.totalSpent)}</span>
        </p>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => navigate(`/students/${student.id}`)}
        aria-label={`View details for ${student.name}`}
      >
        View Details
      </Button>
    </div>
  )
}
