# Task CRUD App

A frontend-only task manager built with React, Vite, and TypeScript. Data is stored in the browser using `localStorage`, so you can practice CRUD operations without a backend.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- **Create** tasks with title, optional description, and status
- **Read** all tasks with status filters (All, Todo, In Progress, Done)
- **Update** tasks via the edit form
- **Delete** tasks with a confirmation prompt
- **Persist** data in `localStorage` across page refreshes

## Project Structure

```
src/
├── types/task.ts              # Task types and input shapes
├── services/
│   ├── taskService.ts         # CRUD functions used by the UI
│   └── localStorageAdapter.ts # Reads/writes JSON to localStorage
├── hooks/useTasks.ts          # React state + CRUD actions
├── components/                # UI components
├── App.tsx                    # Main layout
└── App.css                    # Styles
```

## Where the CRUD Logic Lives

| Layer | File | Role |
|-------|------|------|
| Types | `src/types/task.ts` | Defines the `Task` shape |
| Storage | `src/services/localStorageAdapter.ts` | Low-level localStorage read/write |
| Service | `src/services/taskService.ts` | `getTasks`, `createTask`, `updateTask`, `deleteTask` |
| Hook | `src/hooks/useTasks.ts` | Loads tasks and exposes actions to components |
| UI | `src/components/` | Forms, list, filters |

The UI never calls `localStorage` directly. Everything goes through `taskService`, which makes it easy to swap in a real backend later.

## Backend Migration Path

When you build your backend, create `src/services/apiTaskService.ts` with the same function signatures as `taskService.ts`, then re-export from the API version instead of using localStorage.

Suggested REST API:

```
GET    /api/tasks          → Task[]
POST   /api/tasks          → Task       (body: CreateTaskInput)
PUT    /api/tasks/:id      → Task       (body: UpdateTaskInput)
DELETE /api/tasks/:id      → 204 No Content
```

### Task shape

```typescript
type Task = {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
  updatedAt: string;
};
```

### Example API service (future)

```typescript
export async function getTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(input: CreateTaskInput): Promise<Task> {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}
```

Only one import in `useTasks.ts` needs to change — from `taskService` to `apiTaskService`.

## Scripts

- `npm run dev` — start development server
- `npm run build` — type-check and build for production
- `npm run preview` — preview production build
