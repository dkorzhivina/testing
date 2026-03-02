import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Link to={`/users/${user.id}`} className="user-card" aria-label={`Профиль ${user.first_name} ${user.last_name}`}>
      <div className="user-card__avatar-wrap">
        <img
          className="user-card__avatar"
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
          loading="lazy"
          width={80}
          height={80}
        />
      </div>
      <div className="user-card__body">
        <p className="user-card__name">{user.first_name} {user.last_name}</p>
        <p className="user-card__email">{user.email}</p>
      </div>
      <span className="user-card__arrow" aria-hidden="true">→</span>
    </Link>
  );
}
