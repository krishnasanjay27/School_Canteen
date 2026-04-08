export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
