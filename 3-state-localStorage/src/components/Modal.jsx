import { useEffect, useRef } from "react";
import Button from "./Button";
import Input from "./Input";

export default function Modal({ title, setTitle, error, onAdd, onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Новая задача">
        <div className="modal-header">
          <h2 className="modal-title">Новая задача</h2>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>

        <div className="modal-body">
          <Input
            ref={inputRef}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Введите название задачи..."
            onKeyDown={e => {
              if (e.key === "Enter") onAdd();
            }}
            error={error}
          />
          {error && <div className="error-text">{error}</div>}
        </div>

        <div className="modal-footer">
          <Button variant="ghost" onClick={onClose}>Отмена</Button>
          <Button variant="primary" onClick={onAdd}>Добавить</Button>
        </div>
      </div>
    </div>
  );
}
