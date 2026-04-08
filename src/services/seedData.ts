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
  const existingRaw = localStorage.getItem(SNACKS_KEY)

  // If nothing is present, seed completely
  if (!existingRaw) {
    const snacks: Snack[] = INITIAL_SNACKS.map((s) => ({ ...s, id: generateId() }))
    localStorage.setItem(SNACKS_KEY, JSON.stringify(snacks))
    return
  }

  // If data exists, merge new items (by name) that aren't already there
  try {
    const existingSnacks = JSON.parse(existingRaw) as Snack[]
    const existingNames = new Set(existingSnacks.map(s => s.name.toLowerCase()))
    
    let hasNewItems = false
    const updatedSnacks = [...existingSnacks]
    
    for (const initialSnack of INITIAL_SNACKS) {
      if (!existingNames.has(initialSnack.name.toLowerCase())) {
        updatedSnacks.push({ ...initialSnack, id: generateId() })
        hasNewItems = true
      }
    }
    
    if (hasNewItems) {
      localStorage.setItem(SNACKS_KEY, JSON.stringify(updatedSnacks))
    }
  } catch (error) {
    console.error('Failed to parse existing snacks from localStorage', error)
  }
}
