import { CreateStudentForm } from '../components/CreateStudentForm'

export function CreateStudentPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Create Student</h1>
        <p className="mt-1 text-sm text-gray-500">
          Register a new student for the canteen ordering system.
        </p>
      </div>

      <div className="rounded border border-gray-200 bg-white p-6 shadow-sm">
        <CreateStudentForm />
      </div>
    </main>
  )
}
