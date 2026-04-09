import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Snacks', to: '/snacks' },
  { label: 'Students', to: '/students' },
  { label: 'Create Student', to: '/students/create' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex h-14 items-center gap-2">
          <span className="text-base font-semibold text-gray-900">🍱 School Canteen</span>
        </div>
        <nav className="flex items-center gap-0.5" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                [
                  'rounded px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
