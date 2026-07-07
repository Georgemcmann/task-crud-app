import { useState } from "react";
import { TaskFilters } from "./features/tasks/components/TaskFilters";
import { TaskForm } from "./features/tasks/components/TaskForm";
import { TaskList } from "./features/tasks/components/TaskList";
import { useTasks } from "./features/tasks/hooks/useTasks";
import type { CreateTaskInput, Task } from "./features/tasks/types/task";
import "./App.css";

function App() {
  const {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
  } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  async function handleSubmit(input: CreateTaskInput) {
    if (editingTask) {
      await editTask(editingTask.id, input);
      setEditingTask(null);
      return;
    }

    await addTask(input);
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  const taskCountLabel =
    tasks.length === 1 ? "1 task" : `${tasks.length} tasks`;

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Task Manager</h1>
          <p className="app-subtitle">Frontend-only CRUD practice app</p>
        </div>
        <span className="task-count">{taskCountLabel}</span>
      </header>

      <main className="app-main">
        <TaskFilters filter={filter} onChange={setFilter} />

        <section className="panel">
          <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
          <TaskForm
            key={editingTask?.id ?? "new"}
            initialTask={editingTask}
            onSubmit={handleSubmit}
            onCancel={editingTask ? handleCancelEdit : undefined}
          />
        </section>

        {error && <p className="app-error">{error}</p>}

        <section className="panel">
          <h2>Tasks</h2>
          <TaskList
            tasks={filteredTasks}
            filter={filter}
            loading={loading}
            onEdit={handleEdit}
            onDelete={removeTask}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
