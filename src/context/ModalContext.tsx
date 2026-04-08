import { createContext, useContext, useState, ReactNode } from 'react'
import { Snack, Student } from '../types'

interface ModalContextValue {
  isOpen: boolean
  selectedSnack: Snack | null
  selectedStudent: Student | null
  openModal: (snack?: Snack, student?: Student) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSnack, setSelectedSnack] = useState<Snack | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const openModal = (snack?: Snack, student?: Student) => {
    setSelectedSnack(snack ?? null)
    setSelectedStudent(student ?? null)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedSnack(null)
    setSelectedStudent(null)
  }

  return (
    <ModalContext.Provider value={{ isOpen, selectedSnack, selectedStudent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}
