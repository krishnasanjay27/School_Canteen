# Prompts Used

This document records selected prompts used to assist with scaffolding,
refinement, and UI improvements during development. The overall architecture,
feature decisions, and integration logic were implemented iteratively during
the build process.
---

## Prompt 1 — Initial Project Scaffold

> Generate an initial scaffold for a production-ready frontend architecture using React + TypeScript + Vite + TailwindCSS.
> Project: School Canteen Ordering System. Features: Snacks page, Students page, Student Detail page, Create Student page. Use localStorage persistence. Use React Query, React Hook Form, Context API. Follow scalable folder architecture. Clean dashboard-style UI.

**Outcome:** Complete project structure with all layers (services, hooks, context, components, pages), seeded with 6 snacks.

---

## Prompt 2 — Production Refinements

> Improve the application with responsive layout adjustments (Tailwind breakpoints), recent orders persistence using localStorage, optimistic UI updates with rollback support, QueryClient configuration separation, accessibility improvements (aria-modal usage, focus trap, ESC close behavior), and retry support in the ErrorState component

**Outcome:** All refinements applied cleanly on top of the existing architecture without restructuring.

---

## Design Decisions

- **No gradients, no glow** — white background, gray borders, minimal shadow
- **Blue primary, green success, red error** — semantic color only
- **Optimistic updates** — snack `ordersCount` and student `totalSpent` update instantly in the UI, rolled back if the mutation fails
- **Focus trap in modal** — Tab cycles within modal; ESC closes it
- **Responsive without breakpoint overrides** — `sm:` and `lg:` only where needed
