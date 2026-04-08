import { useEffect, useRef, useState } from 'react'
import { useModal } from '../context/ModalContext'
import { useSnacks } from '../hooks/useSnacks'
import { useStudents } from '../hooks/useStudents'
import { useCreateOrder } from '../hooks/useOrders'
import { formatCurrency } from '../utils/format'
import { Button } from './Button'

export function OrderModal() {
  const { isOpen, selectedSnack, selectedStudent, closeModal } = useModal()
  const { data: snacks = [] } = useSnacks()
  const { data: students = [] } = useStudents()
  const createOrder = useCreateOrder()

  const [studentId, setStudentId] = useState('')
  const [snackId, setSnackId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [successMsg, setSuccessMsg] = useState('')
  const [formError, setFormError] = useState('')

  const closeRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStudentId(selectedStudent?.id ?? '')
      setSnackId(selectedSnack?.id ?? '')
      setQuantity(1)
      setSuccessMsg('')
      setFormError('')
      // Focus close button on open
      setTimeout(() => closeRef.current?.focus(), 50)
    }
  }, [isOpen, selectedSnack, selectedStudent])

  // ESC to close + focus trap
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
        return
      }
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeModal])

  const currentSnack = snacks.find((s) => s.id === snackId)
  const amount = currentSnack ? currentSnack.price * quantity : 0

  const handleSubmit = () => {
    if (!studentId) { setFormError('Please select a student.'); return }
    if (!snackId) { setFormError('Please select a snack.'); return }
    setFormError('')
    createOrder.mutate(
      { studentId, snackId, quantity, amount },
      {
        onSuccess: () => {
          setSuccessMsg('Order placed successfully!')
          setTimeout(() => closeModal(), 1400)
        },
        onError: () => {
          setFormError('Failed to place order. Please try again.')
        },
      }
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full rounded-t-xl border border-gray-200 bg-white shadow-lg sm:max-w-md sm:rounded-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 id="modal-title" className="text-base font-semibold text-gray-900">
            Place Order
          </h2>
          <button
            ref={closeRef}
            onClick={closeModal}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-5 py-4">
          {successMsg ? (
            <div className="flex items-center gap-2 rounded border border-green-200 bg-green-50 px-4 py-3">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-medium text-green-800">{successMsg}</p>
            </div>
          ) : (
            <>
              {/* Snack selector — shown only if no snack pre-selected */}
              {!selectedSnack && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="modal-snack" className="text-sm font-medium text-gray-700">
                    Snack <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="modal-snack"
                    value={snackId}
                    onChange={(e) => { setSnackId(e.target.value); setFormError('') }}
                    className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a snack</option>
                    {snacks.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — ₹{s.price}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Pre-selected snack display */}
              {selectedSnack && (
                <div className="rounded border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Snack</p>
                  <p className="mt-0.5 font-medium text-gray-900">{selectedSnack.name}</p>
                  <p className="text-sm text-blue-600 font-semibold">{formatCurrency(selectedSnack.price)}</p>
                </div>
              )}

              {/* Student selector */}
              <div className="flex flex-col gap-1">
                <label htmlFor="modal-student" className="text-sm font-medium text-gray-700">
                  Student <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="modal-student"
                  value={studentId}
                  onChange={(e) => { setStudentId(e.target.value); setFormError('') }}
                  disabled={Boolean(selectedStudent)}
                  className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Select a student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.referralCode})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-1">
                <label htmlFor="modal-quantity" className="text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <select
                  id="modal-quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Total */}
              {amount > 0 && (
                <div className="rounded border border-gray-200 bg-gray-50 px-4 py-2.5">
                  <p className="text-sm text-gray-600">
                    Total:{' '}
                    <span className="font-semibold text-gray-900">{formatCurrency(amount)}</span>
                  </p>
                </div>
              )}

              {formError && (
                <p className="text-sm text-red-600" role="alert">{formError}</p>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!successMsg && (
          <div className="flex justify-end gap-2 border-t border-gray-200 px-5 py-4">
            <Button variant="secondary" size="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              loading={createOrder.isPending}
              onClick={handleSubmit}
              disabled={createOrder.isPending}
              aria-label="Confirm order"
            >
              Confirm Order
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
