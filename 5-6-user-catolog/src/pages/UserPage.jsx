import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchUser } from "../api/usersApi";
import { useToast } from "../context/ToastContext";
import Spinner from "../components/Spinner";
import StateMessage from "../components/StateMessage";

export default function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const { addToast } = useToast();
  const abortRef = useRef(null);

  function load() {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("loading");

    fetchUser(id, controller.signal)
      .then(data => {
        setUser(data);
        setStatus("success");
      })
      .catch(err => {
        if (err.name === "AbortError") return;
        setStatus("error");
        addToast(err.message || "Не удалось загрузить пользователя");
      });
  }

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [id]);

  return (
    <div className="page">
      <Link to="/" className="back-btn" aria-label="Назад к каталогу">
        ← Назад
      </Link>

      {status === "loading" && (
        <div className="user-detail-loader">
          <Spinner size="lg" />
        </div>
      )}

      {status === "error" && (
        <StateMessage
          icon="⚠"
          title="Не удалось загрузить пользователя"
          text="Возможно, такого пользователя не существует"
          action={{ label: "Повторить", onClick: load }}
        />
      )}

      {status === "success" && user && (
        <div className="user-detail" role="main">
          <div className="user-detail__card">
            <div className="user-detail__avatar-wrap">
              <img
                className="user-detail__avatar"
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                width={120}
                height={120}
              />
            </div>

            <div className="user-detail__info">
              <h1 className="user-detail__name">
                {user.first_name} {user.last_name}
              </h1>
              <a
                className="user-detail__email"
                href={`mailto:${user.email}`}
                aria-label={`Написать на ${user.email}`}
              >
                ✉ {user.email}
              </a>

              <div className="user-detail__meta">
                <div className="user-detail__meta-item">
                  <span className="user-detail__meta-label">ID</span>
                  <span className="user-detail__meta-value">#{user.id}</span>
                </div>
                {user.username && (
                  <div className="user-detail__meta-item">
                    <span className="user-detail__meta-label">Username</span>
                    <span className="user-detail__meta-value">@{user.username}</span>
                  </div>
                )}
                {user.phone && (
                  <div className="user-detail__meta-item">
                    <span className="user-detail__meta-label">Телефон</span>
                    <span className="user-detail__meta-value">{user.phone}</span>
                  </div>
                )}
                {user.website && (
                  <div className="user-detail__meta-item">
                    <span className="user-detail__meta-label">Сайт</span>
                    <span className="user-detail__meta-value">{user.website}</span>
                  </div>
                )}
                {user.company?.name && (
                  <div className="user-detail__meta-item">
                    <span className="user-detail__meta-label">Компания</span>
                    <span className="user-detail__meta-value">{user.company.name}</span>
                  </div>
                )}
                {user.address?.city && (
                  <div className="user-detail__meta-item">
                    <span className="user-detail__meta-label">Город</span>
                    <span className="user-detail__meta-value">{user.address.city}</span>
                  </div>
                )}
              </div>

              <button
                className="user-detail__back-btn"
                onClick={() => navigate(-1)}
              >
                ← Вернуться назад
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
