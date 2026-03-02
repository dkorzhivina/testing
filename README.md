# Frontend-задания (testing)

Репозиторий с выполненными заданиями: статические верстки и React-приложения (Vite). Все проекты — только frontend, без серверной части.

---

## Как запустить проект локально

Каждое задание лежит в своей папке. Команды выполнять **внутри папки** задания.

### Статические (HTML/CSS/JS)

| Папка | Запуск |
|-------|--------|
| **1-Pixel-perfect** | Открыть в браузере `index.html` или поднять любой статический сервер (например, `npx serve .`) |
| **2-Catolog** | То же: открыть `index.html` или `npx serve .` |

### React (Vite)

| Папка | Установка | Разработка | Сборка |
|-------|-----------|------------|--------|
| **3-state-localStorage** | `npm install` | `npm run dev` | `npm run build` |
| **4-form** | `npm install` | `npm run dev` | `npm run build` |
| **5-6-user-catolog** | `npm install` | `npm run dev` | `npm run build` |

Дополнительно в **5-6-user-catolog**:
- тесты: `npm run test:run`
- линт: `npm run lint`
- форматирование: `npm run format`

После `npm run dev` в консоли будет указан адрес (например, `http://localhost:5173/`).

---

## Что выполнено полностью, что частично

### 1-Pixel-perfect — полностью
- Карточка товара (Product Card), верстка по макету.
- Своя стилизация (CSS), единая палитра, состояния hover/active/focus и видимый focus для кнопок и логотипа.

### 2-Catolog — полностью
- Каталог товаров с фильтрами (поиск, сортировка, «только в наличии»).
- Статическая верстка + JS без фреймворка.
- Состояния и доступность: hover, focus-visible, disabled у кнопок, стили для полей и чекбокса.

### 3-state-localStorage — полностью
- Список задач с добавлением, переключением и удалением.
- localStorage через кастомный хук.
- Фильтр по статусу, поиск, сортировка по дате.
- Состояния: loading, empty, error, валидация формы.
- Компоненты: Button, Input, Modal, TaskCard, Filters.
- Модалка добавления задачи, закрытие по Esc, добавление по Enter.
- Дизайн в фиолетовых оттенках, без комментариев в коде.

### 4-form — полностью
- Форма регистрации: email, пароль, подтверждение, имя, дата рождения, чекбокс согласия.
- Валидация: формат email, пароль ≥8 и минимум 1 цифра, совпадение паролей, обязательные поля.
- Состояния: loading (имитация), success после «отправки», кнопка показа/скрытия пароля.
- Ошибки показываются после взаимодействия (touched), не сразу.
- Навигация с клавиатуры, focus и aria-атрибуты, индикатор силы пароля, autocomplete.
- Стилизация своя (CSS), фиолетовая палитра.

### 5-6-user-catolog — полностью, но есть проблемы с загрузкой данных, я не понимаю в чем причина ()
- Список пользователей (API JSONPlaceholder), пагинация, поиск с debounce, страница `/users/:id`.
- React Router, Fetch + AbortController, отмена запросов при смене поиска и уходе со страницы.
- Состояния: loading, empty, error, retry.
- Архитектура: слой api, страницы, UI-компоненты.
- Задание 6: lazy-маршруты, Error Boundary, виртуализация (react-window при списке >8), 5–8 тестов (Vitest + Testing Library), ESLint + Prettier, README с архитектурой и стратегией тестов.
- Бонусы: кэш последнего результата в сессии, глобальный toast для ошибок, CI (GitHub Actions: lint + test), в README — про Lighthouse.

---

## Ключевые решения и компромиссы

1. **Единая стилизация** — во всех проектах свой CSS (без MUI/Ant/Chakra), общая фиолетовая палитра и переменные для консистентного вида и контраста.

2. **5-6-user-catolog: API** — используется JSONPlaceholder вместо Reqres из-за стабильной доступности без ключа; данные обогащаются (first_name, last_name, аватар через DiceBear).

3. **5-6: react-window 2.x** — в 2.x нет экспорта `FixedSizeList`, только `List` с другим API (rowComponent, rowProps, rowHeight и т.д.). Реализация переведена на новый API.

4. **Виртуализация в 5-6** — включается только при наличии `ResizeObserver` и измеренных размерах контейнера; в тестах (jsdom без ResizeObserver) рендерится обычный список, чтобы тесты не падали.

5. **TypeScript** — не используовала, так как плохо еще его знаю; использовала JS для всех React-проектов.

6. **Доступность** — везде видимый focus (`:focus` / `:focus-visible`), семантика (header, main, button, label, nav, role/aria где нужно), стили для disabled и корректный tab-order без лишних tabindex.

7. **4-form: форма на странице** — задание допускает «модалку или отдельную форму»; в 4-form форма на странице (без модалки), в 3-state-localStorage добавление задачи вынесено в модалку.

8. **5-6: code splitting** — маршруты подключаются через `React.lazy()` + `Suspense`, чтобы уменьшить начальный бандл и не показывать лишний код при первом заходе.

---

## Скриншоты 
**Задание 1**
360
<img width="1663" height="1398" alt="image" src="https://github.com/user-attachments/assets/037e20a2-4ab4-43fc-a81b-6859038ab421" />
768
<img width="1673" height="1355" alt="image" src="https://github.com/user-attachments/assets/0734bc7d-cdf6-4ef9-9312-18ddeecb3727" />
1280
<img width="2784" height="1427" alt="image" src="https://github.com/user-attachments/assets/9d1f2a02-36b7-4b9e-9b3a-8e69f2aa601e" />

**Задание 2**
360
<img width="1701" height="1375" alt="image" src="https://github.com/user-attachments/assets/440aab01-ccb4-42f6-a27a-ea29c25552b4" />
768
<img width="1671" height="1366" alt="image" src="https://github.com/user-attachments/assets/b909d5e5-dba9-4836-a92e-8db572a0f6f3" />
1280
<img width="2740" height="1373" alt="image" src="https://github.com/user-attachments/assets/0920a3bb-766d-440b-b0e3-9755984af513" />

**Задание 3**
360
<img width="1653" height="1378" alt="image" src="https://github.com/user-attachments/assets/d54e8826-f935-4365-a200-f1c7db18242b" />
768
<img width="1676" height="1239" alt="image" src="https://github.com/user-attachments/assets/f13a2951-a427-460e-90e8-4bacfade0bc4" />
1280
<img width="2789" height="1371" alt="image" src="https://github.com/user-attachments/assets/7785d0fa-afc8-403f-a62a-c0459828230f" />

**Задание 4**
360
<img width="1687" height="1346" alt="image" src="https://github.com/user-attachments/assets/ecf1a4f2-77ce-48d2-92dd-03f8f1689d54" />
<img width="1687" height="1321" alt="image" src="https://github.com/user-attachments/assets/34465663-481d-4e02-95c5-93b6af45196f" />
768
<img width="1683" height="1300" alt="image" src="https://github.com/user-attachments/assets/ec589597-618f-4d5a-acbd-923df7999bb1" />
1280
<img width="2750" height="1428" alt="image" src="https://github.com/user-attachments/assets/fad3e4cb-a741-451c-8c5b-20efa9eb0497" />
<img width="2744" height="1372" alt="image" src="https://github.com/user-attachments/assets/10017437-bc9b-49bf-8e19-73dd4998cae0" />

**Задание 5-6**
360
<img width="1660" height="1379" alt="image" src="https://github.com/user-attachments/assets/8f775e7c-0896-4d94-a3c8-48f509fd98cb" />
768
<img width="1651" height="1377" alt="image" src="https://github.com/user-attachments/assets/1182e602-f415-46cb-af30-488d09de5845" />
1280
<img width="2745" height="1383" alt="image" src="https://github.com/user-attachments/assets/3ce915d0-8704-4360-8069-6d3821f16d85" />










