# UserCatalog

Каталог пользователей на React: список с пагинацией, поиском с debounce, страница пользователя. Данные с JSONPlaceholder, отмена запросов через AbortController.

## Запуск

```bash
npm install
npm run dev
```

Сборка: `npm run build`. Тесты: `npm run test` (watch) / `npm run test:run`. Линт: `npm run lint`. Форматирование: `npm run format`.

## Архитектура

- **api/** — слой запросов: `usersApi.js` (fetchUsers, fetchUser), сессионный кэш, обогащение данных (first_name, last_name, avatar).
- **pages/** — маршрутируемые страницы: `UsersPage` (список, поиск, пагинация), `UserPage` (профиль по `/users/:id`). Подгружаются через `React.lazy()`.
- **components/** — UI: `UserCard`, `Pagination`, `VirtualUserList` (react-window при >8 элементов), `Spinner`, `StateMessage`, `ErrorBoundary`.
- **context/** — `ToastContext` для глобальных уведомлений об ошибках.
- **hooks/** — `useDebounce` для отложенного поиска.

Роутинг: React Router. Состояния: loading, empty, error, retry. Ошибки рендера перехватывает Error Boundary с кнопкой «Попробовать снова».

## Стратегия тестов

- **Среда:** Vitest + jsdom, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom (setup в `src/test/setup.js`).
- **Unit (3–4):** проверяют поведение, без снапшотов:
  - `useDebounce` — начальное значение, обновление после задержки, сброс таймера при повторном изменении.
  - `usersApi` — обогащение пользователей (first_name, last_name, avatar), ошибка при !res.ok.
  - `Pagination` — скрытие при одной странице, вызов onPageChange по клику prev/next/номеру, disabled на первой/последней странице.
  - `UserCard` — имя, email, ссылка на `/users/:id`, alt аватара.
  - `StateMessage` — заголовок, текст, кнопка action и вызов onClick.
  - `ErrorBoundary` — рендер детей без ошибки, fallback при throw, вызов onError, сброс по кнопке «Попробовать снова».
- **Интеграция (2–3):** с моком `fetch` и очисткой сессионного кэша:
  - `UsersPage` — после успешного fetch отображаются имена и email; при ошибке — текст ошибки и кнопка «Повторить»; поиск: placeholder и ввод в поле.

Тесты не используют snapshot; проверяются текст, атрибуты, клики и асинхронное появление контента через `waitFor`.

## Производительность

- **Code splitting:** маршруты подгружаются лениво (`lazy()` + `Suspense`), уменьшается начальный бандл.
- **Виртуализация:** при количестве пользователей на странице >8 список рендерится через `react-window` (FixedSizeList), чтобы не раздувать DOM при большом списке.
- **Lighthouse:** для быстрой проверки после `npm run build` и `npm run preview` можно запустить Lighthouse (Chrome DevTools → Lighthouse): обратить внимание на First Contentful Paint и отсутствие длинных задач в основном потоке. Рекомендуется держать LCP < 2.5 s и CLS минимальным.
