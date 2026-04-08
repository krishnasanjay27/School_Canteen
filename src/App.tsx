import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { ModalProvider } from './context/ModalContext'
import { seedInitialData } from './services/seedData'
import { Navbar } from './components/Navbar'
import { OrderModal } from './components/OrderModal'
import { SnacksPage } from './pages/SnacksPage'
import { StudentsPage } from './pages/StudentsPage'
import { CreateStudentPage } from './pages/CreateStudentPage'
import { StudentDetailPage } from './pages/StudentDetailPage'

// Seed on app boot (no-op if data already exists)
seedInitialData()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/snacks" replace />} />
              <Route path="/snacks" element={<SnacksPage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/students/create" element={<CreateStudentPage />} />
              <Route path="/students/:id" element={<StudentDetailPage />} />
              <Route path="*" element={<Navigate to="/snacks" replace />} />
            </Routes>
            <OrderModal />
          </div>
        </BrowserRouter>
      </ModalProvider>
    </QueryClientProvider>
  )
}
