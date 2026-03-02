export default function StateMessage({ icon, title, text, action }) {
  return (
    <div className="state-msg">
      {icon && <span className="state-msg__icon" aria-hidden="true">{icon}</span>}
      <p className="state-msg__title">{title}</p>
      {text && <p className="state-msg__text">{text}</p>}
      {action && (
        <button className="state-msg__btn" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
