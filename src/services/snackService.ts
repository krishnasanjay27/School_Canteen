import { Snack } from '../types'

const SNACKS_KEY = 'canteen_snacks'

export function getSnacks(): Snack[] {
  const raw = localStorage.getItem(SNACKS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Snack[]
  } catch {
    return []
  }
}

export function updateSnack(snack: Snack): void {
  const snacks = getSnacks()
  const updated = snacks.map((s) => (s.id === snack.id ? snack : s))
  localStorage.setItem(SNACKS_KEY, JSON.stringify(updated))
}
