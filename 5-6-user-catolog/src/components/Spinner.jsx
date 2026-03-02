export default function Spinner({ size = "md", label = "Загрузка..." }) {
  return (
    <div className={`spinner-wrap spinner-wrap--${size}`} role="status" aria-label={label}>
      <div className="spinner" />
    </div>
  );
}
