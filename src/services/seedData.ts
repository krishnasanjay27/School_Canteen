import { Snack } from '../types'
import { generateId } from '../utils/id'

const SNACKS_KEY = 'canteen_snacks'

const INITIAL_SNACKS: Omit<Snack, 'id'>[] = [
  { name: 'Samosa', price: 15, ordersCount: 0 },
  { name: 'Veg Puff', price: 20, ordersCount: 0 },
  { name: 'Sandwich', price: 35, ordersCount: 0 },
  { name: 'Juice', price: 25, ordersCount: 0 },
  { name: 'Chocolate Milk', price: 30, ordersCount: 0 },
  { name: 'Banana Cake', price: 40, ordersCount: 0 },
  { name: 'Paneer Wrap', price: 80, ordersCount: 0 },
]

export function seedInitialData(): void {
  const existing = localStorage.getItem(SNACKS_KEY)
  if (!existing) {
    const snacks: Snack[] = INITIAL_SNACKS.map((s) => ({ ...s, id: generateId() }))
    localStorage.setItem(SNACKS_KEY, JSON.stringify(snacks))
  }
}
