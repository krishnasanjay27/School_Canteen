import { Student, CreateStudentPayload } from '../types'
import { generateId } from '../utils/id'

const STUDENTS_KEY = 'canteen_students'

export function getStudents(): Student[] {
  const raw = localStorage.getItem(STUDENTS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Student[]
  } catch {
    return []
  }
}

export function getStudentById(id: string): Student | undefined {
  return getStudents().find((s) => s.id === id)
}

export function createStudent(payload: CreateStudentPayload): Student {
  const students = getStudents()
  const newStudent: Student = {
    id: generateId(),
    name: payload.name,
    referralCode: payload.referralCode,
    totalSpent: 0,
  }
  localStorage.setItem(STUDENTS_KEY, JSON.stringify([...students, newStudent]))
  return newStudent
}

export function updateStudent(student: Student): void {
  const students = getStudents()
  const updated = students.map((s) => (s.id === student.id ? student : s))
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(updated))
}
