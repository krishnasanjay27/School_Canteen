import { Order } from '../types'

const RECENT_ORDERS_KEY = 'canteen_recent_orders'
const MAX_RECENT = 5

export function getRecentOrders(): Order[] {
  const raw = localStorage.getItem(RECENT_ORDERS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Order[]
  } catch {
    return []
  }
}

export function addRecentOrder(order: Order): void {
  const recent = getRecentOrders()
  const updated = [order, ...recent].slice(0, MAX_RECENT)
  localStorage.setItem(RECENT_ORDERS_KEY, JSON.stringify(updated))
}
