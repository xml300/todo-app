# Todo App — React + TypeScript + Vite

Small single-page Todo application built with React, TypeScript, Vite and Tailwind CSS. Designed as a local, client-side demo app — no backend required.

## Quick start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

Build for production:

```bash
npm run build
```

Run the preview server (after build):

```bash
npm run preview
```

Lint the code:

```bash
npm run lint
```

## What this project contains

- Vite + React + TypeScript scaffolding (`vite.config.ts`, `tsconfig.json`).
- Tailwind CSS for styling (`tailwind.config.js`, `index.css`, `App.css`).
- Main app and global state in `src/App.tsx` (the `TodoProvider`).
- Pages in `src/pages/`:
	- `NewTodoPage.tsx` — create/edit form (client-side validation, loading state).
	- `TodoDetailPage.tsx` — detail view with actions (edit, delete, toggle).
- Components in `src/components/`:
	- `TodoList.tsx` — list/grid views (responsive behavior: stacked cards on mobile, table on md+).
	- `TodoCard.tsx` — compact card used in grid and mobile list.
	- `Header.tsx`, `Footer.tsx` — layout bits.
- Model types in `src/types.ts` (the `Todo` interface).

## Architecture & important patterns

- Single-page app with no router. Navigation is implemented with a Context API in `src/App.tsx`.
	- Use `navigate(page: string, todo?)` where `page` is one of: `home`, `new`, `edit`, `detail`.
- Global state is in `TodoProvider` (in `src/App.tsx`) and persisted to `localStorage` under the `todos` key.
- The `Todo` model (in `src/types.ts`) includes both `completed: boolean` and `status: 'pending'|'completed'`. Keep these in sync when updating todos.
- New IDs are generated with `Date.now().toString()` (string IDs expected throughout the app).

## Conventions for contributors

- When changing the todo shape, update `src/types.ts`, forms (`NewTodoPage.tsx`), and any code that reads/writes `todos` in `src/App.tsx`.
- If you change navigation strings, update `src/App.tsx` and every `navigate(...)` call.
- Preserve the `localStorage` key `todos` unless performing an explicit migration; handle missing fields defensively.

## UX notes (recent changes)

- `NewTodoPage.tsx` includes inline validation for the title, disabled inputs while submitting, and a loading spinner on submit to avoid double-posts.
- `TodoList.tsx` now renders stacked `TodoCard` components on mobile (small screens) and a table on `md+` screens for a compact desktop layout.
- `TodoDetailPage.tsx` now includes actions (toggle complete, edit, delete) and improved responsive header layout.

## Debugging & dev tips

- Inspect persisted data: open DevTools → Application → Local Storage → `todos` to view and edit current data.
- Build problems: `npm run build` runs `tsc` first — fix TypeScript errors reported by `tsc`.
- Lint problems: `npm run lint` (ESLint configured in `.eslintrc.cjs`).

## Possible next improvements

- Add unit and integration tests (Jest + React Testing Library).
- Replace `confirm()` with a modal and add an undo snackbar for deletions.
- Integrate React Hook Form for more robust validation and fewer re-renders.

If you want, I can add tests and a small CI workflow next. Open to which area you'd like prioritized.
