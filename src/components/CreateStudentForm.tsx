import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateStudent } from '../hooks/useStudents'
import { generateReferralCode } from '../utils/referral'
import { useMemo } from 'react'
import { Input } from './Input'
import { Button } from './Button'

interface FormValues {
  name: string
}

export function CreateStudentForm() {
  const navigate = useNavigate()
  const createStudent = useCreateStudent()
  const referralCode = useMemo(() => generateReferralCode(), [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    createStudent.mutate(data.name, {
      onSuccess: () => navigate('/students'),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Input
        label="Student Name"
        placeholder="e.g. Arjun Sharma"
        required
        error={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
          minLength: { value: 2, message: 'Name must be at least 2 characters' },
        })}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Referral Code</label>
        <div className="rounded border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm font-semibold text-gray-700">
          {referralCode}
        </div>
        <p className="text-xs text-gray-500">Auto-generated and assigned on creation.</p>
      </div>

      {createStudent.isError && (
        <p className="text-sm text-red-600" role="alert">
          Failed to create student. Please try again.
        </p>
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={createStudent.isPending}
          disabled={createStudent.isPending}
          aria-label="Create student"
        >
          Create Student
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => navigate('/students')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
