import { useNavigate } from 'react-router-dom'
import { useStudents } from '../hooks/useStudents'
import { StudentListItem } from '../components/StudentListItem'
import { Loader } from '../components/Loader'
import { ErrorState } from '../components/ErrorState'
import { EmptyState } from '../components/EmptyState'
import { Button } from '../components/Button'

export function StudentsPage() {
  const { data: students, isLoading, isError, refetch } = useStudents()
  const navigate = useNavigate()

  if (isLoading) return <Loader text="Loading students..." />
  if (isError) return <ErrorState message="Failed to load students." onRetry={refetch} />

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
      Students
      <span className="ml-2 text-sm font-normal text-gray-500">
        ({students?.length ?? 0})
      </span>
    </h1>
  </div>

  <Button
    variant="primary"
    size="md"
    onClick={() => navigate('/students/create')}
    aria-label="Create new student"
  >
    + Create Student
  </Button>
</div>

      {!students || students.length === 0 ? (
        <EmptyState
          title="No students yet"
          description="Add your first student to get started."
          action={{ label: 'Create Student', onClick: () => navigate('/students/create') }}
        />
      ) : (
        <div className="space-y-3">
          {students.map((student) => (
            <StudentListItem key={student.id} student={student} />
          ))}
        </div>
      )}
    </main>
  )
}
