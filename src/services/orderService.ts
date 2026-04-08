import { Order, CreateOrderPayload } from '../types'
import { generateId } from '../utils/id'
import { getSnacks, updateSnack } from './snackService'
import { getStudentById, updateStudent } from './studentService'

const ORDERS_KEY = 'canteen_orders'

export function getOrders(): Order[] {
  const raw = localStorage.getItem(ORDERS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Order[]
  } catch {
    return []
  }
}

export function getOrdersByStudentId(studentId: string): Order[] {
  return getOrders().filter((o) => o.studentId === studentId)
}

export function createOrder(payload: CreateOrderPayload): Order {
  const orders = getOrders()
  const newOrder: Order = {
    id: generateId(),
    studentId: payload.studentId,
    snackId: payload.snackId,
    quantity: payload.quantity,
    amount: payload.amount,
    createdAt: Date.now(),
  }
  localStorage.setItem(ORDERS_KEY, JSON.stringify([...orders, newOrder]))

  const snack = getSnacks().find((s) => s.id === payload.snackId)
  if (snack) updateSnack({ ...snack, ordersCount: snack.ordersCount + 1 })

  const student = getStudentById(payload.studentId)
  if (student) updateStudent({ ...student, totalSpent: student.totalSpent + payload.amount })

  return newOrder
}
