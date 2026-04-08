# Prompts Used

This document records the prompts used to guide the AI-assisted development of the School Canteen Ordering System.

---

## Prompt 1 — Initial Project Scaffold

> Build a production-deployable frontend web application using React + TypeScript + Vite + TailwindCSS.
> Project: School Canteen Ordering System. Features: Snacks page, Students page, Student Detail page, Create Student page. Use localStorage persistence. Use React Query, React Hook Form, Context API. Follow scalable folder architecture. Clean dashboard-style UI.

**Outcome:** Complete project structure with all layers (services, hooks, context, components, pages), seeded with 6 snacks.

---

## Prompt 2 — Production Refinements

> Improve with: responsive design (Tailwind breakpoints), recent orders localStorage service, optimistic UI updates with rollback, QueryClient separation, accessibility (aria-modal, focus trap, ESC close), retry in ErrorState, README, and PROMPTS_USED docs.

**Outcome:** All refinements applied cleanly on top of the existing architecture without restructuring.

---

## Design Decisions

- **No gradients, no glow** — white background, gray borders, minimal shadow
- **Blue primary, green success, red error** — semantic color only
- **Optimistic updates** — snack `ordersCount` and student `totalSpent` update instantly in the UI, rolled back if the mutation fails
- **Focus trap in modal** — Tab cycles within modal; ESC closes it
- **Responsive without breakpoint overrides** — `sm:` and `lg:` only where needed
