import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getOrdersByStudentId, createOrder } from '../services/orderService'
import { addRecentOrder } from '../services/recentOrdersService'
import { CreateOrderPayload, Snack, Student } from '../types'

export function useOrdersByStudent(studentId: string) {
  return useQuery({
    queryKey: ['orders', studentId],
    queryFn: () => Promise.resolve(getOrdersByStudentId(studentId)),
    enabled: Boolean(studentId),
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => Promise.resolve(createOrder(payload)),

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['snacks'] })
      await queryClient.cancelQueries({ queryKey: ['students'] })
      await queryClient.cancelQueries({ queryKey: ['student', payload.studentId] })

      const prevSnacks = queryClient.getQueryData<Snack[]>(['snacks'])
      const prevStudents = queryClient.getQueryData<Student[]>(['students'])
      const prevStudent = queryClient.getQueryData<Student>(['student', payload.studentId])

      queryClient.setQueryData<Snack[]>(['snacks'], (old) =>
        old?.map((s) =>
          s.id === payload.snackId ? { ...s, ordersCount: s.ordersCount + 1 } : s
        ) ?? []
      )

      queryClient.setQueryData<Student[]>(['students'], (old) =>
        old?.map((s) =>
          s.id === payload.studentId
            ? { ...s, totalSpent: s.totalSpent + payload.amount }
            : s
        ) ?? []
      )

      if (prevStudent) {
        queryClient.setQueryData<Student>(['student', payload.studentId], {
          ...prevStudent,
          totalSpent: prevStudent.totalSpent + payload.amount,
        })
      }

      return { prevSnacks, prevStudents, prevStudent }
    },

    onError: (_err, payload, context) => {
      if (context?.prevSnacks) queryClient.setQueryData(['snacks'], context.prevSnacks)
      if (context?.prevStudents) queryClient.setQueryData(['students'], context.prevStudents)
      if (context?.prevStudent)
        queryClient.setQueryData(['student', payload.studentId], context.prevStudent)
    },

    onSuccess: (newOrder) => {
      addRecentOrder(newOrder)
    },

    onSettled: (_data, _error, payload) => {
      queryClient.invalidateQueries({ queryKey: ['snacks'] })
      queryClient.invalidateQueries({ queryKey: ['students'] })
      queryClient.invalidateQueries({ queryKey: ['student', payload.studentId] })
      queryClient.invalidateQueries({ queryKey: ['orders', payload.studentId] })
    },
  })
}
