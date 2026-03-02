import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import TaskCard from "./components/TaskCard";
import Filters from "./components/Filters";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  function openModal() {
    setTitle("");
    setError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setTitle("");
    setError("");
  }

  function addTask() {
    if (!title.trim()) {
      setError("Введите название задачи");
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTasks(prev => [newTask, ...prev]);
    closeModal();
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter(task => {
      if (statusFilter === "active") return !task.completed;
      if (statusFilter === "completed") return task.completed;
      return true;
    })
    .sort((a, b) =>
      sort === "newest" ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
    );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Список задач</h1>
        <p>Управляйте задачами — данные сохраняются автоматически</p>
      </header>

      <Filters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sort={sort}
        setSort={setSort}
      />

      {loading && (
        <div className="state-message">
          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {!loading && filteredTasks.length === 0 && (
        <div className="state-message">
          <span className="state-message-icon">📋</span>
          {search || statusFilter !== "all"
            ? "Ничего не найдено"
            : "Задач пока нет — нажмите + чтобы добавить!"}
        </div>
      )}

      {!loading && filteredTasks.length > 0 && (
        <div className="task-list">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      )}

      <button className="open-modal-btn" onClick={openModal} aria-label="Добавить задачу">
        +
      </button>

      {modalOpen && (
        <Modal
          title={title}
          setTitle={setTitle}
          error={error}
          onAdd={addTask}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
