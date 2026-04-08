import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getStudents, getStudentById, createStudent } from '../services/studentService'
import { generateReferralCode } from '../utils/referral'

export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => Promise.resolve(getStudents()),
  })
}

export function useStudentById(id: string) {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => {
      const student = getStudentById(id)
      if (!student) throw new Error('Student not found')
      return Promise.resolve(student)
    },
    enabled: Boolean(id),
  })
}

export function useCreateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name: string) =>
      Promise.resolve(createStudent({ name, referralCode: generateReferralCode() })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}
