export default function TaskCard({ task, onToggle, onDelete }) {
  const date = new Date(task.createdAt).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`task-card${task.completed ? " task-card--done" : ""}`}>
      <div className="task-left">
        <button
          className={`task-checkbox${task.completed ? " task-checkbox--checked" : ""}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? "Вернуть задачу" : "Отметить выполненной"}
        >
          {task.completed && "✓"}
        </button>

        <div className="task-body">
          <p className={`task-title${task.completed ? " task-title--done" : ""}`}>
            {task.title}
          </p>
          <span className="task-date">{date}</span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className={`btn ${task.completed ? "btn-ghost" : "btn-success"}`}
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Вернуть" : "Готово"}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(task.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
