const BASE_URL = "https://jsonplaceholder.typicode.com";

const sessionCache = new Map();

function avatarUrl(seed) {
  return `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9&scale=90`;
}

function enrichUser(user) {
  const parts = user.name.split(" ");
  return {
    ...user,
    first_name: parts[0] ?? user.name,
    last_name: parts.slice(1).join(" ") || "",
    avatar: avatarUrl(user.id),
  };
}

export async function fetchUsers({ page = 1, search = "" } = {}, signal) {
  const cacheKey = `users:${page}:${search}`;
  if (sessionCache.has(cacheKey)) {
    return sessionCache.get(cacheKey);
  }

  const res = await fetch(`${BASE_URL}/users`, { signal });
  if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);

  const raw = await res.json();
  let all = raw.map(enrichUser);

  if (search) {
    const lower = search.toLowerCase();
    all = all.filter(u =>
      u.name.toLowerCase().includes(lower) ||
      u.email.toLowerCase().includes(lower)
    );
  }

  const perPage = 10;
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const sliced = all.slice((safePage - 1) * perPage, safePage * perPage);

  const result = {
    data: sliced,
    total_pages: totalPages,
    total,
    page: safePage,
  };

  sessionCache.set(cacheKey, result);
  return result;
}

export async function fetchUser(id, signal) {
  const cacheKey = `user:${id}`;
  if (sessionCache.has(cacheKey)) {
    return sessionCache.get(cacheKey);
  }

  const res = await fetch(`${BASE_URL}/users/${id}`, { signal });
  if (!res.ok) throw new Error(`Пользователь не найден (${res.status})`);

  const raw = await res.json();
  const user = enrichUser(raw);

  sessionCache.set(cacheKey, user);
  return user;
}

export function clearSessionCache() {
  sessionCache.clear();
}
