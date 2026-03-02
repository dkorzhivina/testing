import { useEffect, useRef, useState } from "react";
import { fetchUsers } from "../api/usersApi";
import { useDebounce } from "../hooks/useDebounce";
import { useToast } from "../context/ToastContext";
import VirtualUserList from "../components/VirtualUserList";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import StateMessage from "../components/StateMessage";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [retryKey, setRetryKey] = useState(0);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("loading");

  const debouncedSearch = useDebounce(search, 350);
  const { addToast } = useToast();
  const abortRef = useRef(null);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");

    fetchUsers({ page, search: debouncedSearch }, controller.signal)
      .then(data => {
        setUsers(data.data);
        setTotalPages(data.total_pages);
        setStatus(data.data.length === 0 ? "empty" : "success");
      })
      .catch(err => {
        if (err.name === "AbortError") return;
        setStatus("error");
        addToast(err.message || "Не удалось загрузить пользователей");
      });

    return () => controller.abort();
  }, [page, debouncedSearch, retryKey, addToast]);

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Каталог пользователей</h1>
          <p className="page-subtitle">Найдите нужного пользователя</p>
        </div>
      </div>

      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          className="search-input"
          type="search"
          placeholder="Поиск по имени или email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Поиск пользователей"
        />
        {status === "loading" && (
          <span className="search-spinner"><Spinner size="sm" /></span>
        )}
      </div>

      <div className="users-grid" aria-live="polite" aria-busy={status === "loading"}>
        {status === "loading" && users.length === 0 && (
          <div className="users-grid__loader">
            <Spinner size="lg" />
          </div>
        )}

        {status === "error" && (
          <StateMessage
            icon="⚠"
            title="Не удалось загрузить данные"
            text="Проверьте подключение к интернету и попробуйте снова"
            action={{ label: "Повторить", onClick: () => setRetryKey(k => k + 1) }}
          />
        )}

        {status === "empty" && (
          <StateMessage
            icon="🔍"
            title="Ничего не найдено"
            text={search ? `По запросу «${search}» пользователей не найдено` : "Список пользователей пуст"}
          />
        )}

        {(status === "success" || (status === "loading" && users.length > 0)) && (
          <div className={`users-list${status === "loading" ? " users-list--fading" : ""}`}>
            <VirtualUserList users={users} />
          </div>
        )}
      </div>

      {status === "success" && totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
