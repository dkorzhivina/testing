export default function Filters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sort,
  setSort,
}) {
  return (
    <div className="filters">
      <input
        className="filter-input"
        placeholder="Поиск задач..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select
        className="filter-select"
        value={statusFilter}
        onChange={e => setStatusFilter(e.target.value)}
      >
        <option value="all">Все задачи</option>
        <option value="active">Активные</option>
        <option value="completed">Выполненные</option>
      </select>

      <select
        className="filter-select"
        value={sort}
        onChange={e => setSort(e.target.value)}
      >
        <option value="newest">Сначала новые</option>
        <option value="oldest">Сначала старые</option>
      </select>
    </div>
  );
}
