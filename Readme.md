# School Canteen Ordering System

A production-ready frontend SPA for a school canteen digital ordering platform. Students can browse snacks, place orders, and track their spending history.

---

## Tech Stack

| Layer | Library |
|---|---|
| Build | Vite 5 |
| Framework | React 18 + TypeScript |
| Styling | TailwindCSS 3 |
| Routing | React Router v6 |
| Server State | TanStack React Query v5 |
| Forms | React Hook Form v7 |
| Global UI State | Context API |
| Persistence | localStorage (no backend required) |

---

## Features

- **Snacks Page** — responsive grid of snack cards with order count badges
- **Order Modal** — student + quantity selector, ESC to close, focus trap, optimistic UI
- **Students Page** — list with referral codes and total spend
- **Student Detail Page** — profile + horizontally-scrollable order history table
- **Create Student Page** — validated form with auto-generated referral code
- **Persistent data** — all data stored in `localStorage`, survives page refresh and deployment

---

## Folder Structure

```
src/
├── components/   # Button, Input, Loader, ErrorState, EmptyState, Navbar,
│                 # SnackCard, StudentListItem, OrderModal, CreateStudentForm
├── pages/        # SnacksPage, StudentsPage, CreateStudentPage, StudentDetailPage
├── services/     # snackService, studentService, orderService,
│                 # recentOrdersService, seedData
├── context/      # ModalContext
├── hooks/        # useSnacks, useStudents, useOrders
├── lib/          # queryClient (QueryClient instance)
├── types/        # Snack, Student, Order, CreateOrderPayload, CreateStudentPayload
└── utils/        # id, referral, format
```

---

## localStorage Persistence

All data is stored in four localStorage keys:

| Key | Contents |
|---|---|
| `canteen_snacks` | Array of `Snack` objects (seeded on first load) |
| `canteen_students` | Array of `Student` objects |
| `canteen_orders` | Array of all `Order` objects |
| `canteen_recent_orders` | Last 5 orders placed |

**Seed data** (6 snacks) is initialized automatically on the first app load if `canteen_snacks` is empty.

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

This app has **no backend dependency**. It works entirely from localStorage.

### Vercel

1. Push to GitHub/GitLab
2. Import repo in [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy ✓

### Netlify

1. Push to GitHub/GitLab
2. New site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click Deploy ✓

No environment variables required.
