import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Spinner from "./components/Spinner";
import "./App.css";

const UsersPage = lazy(() => import("./pages/UsersPage"));
const UserPage = lazy(() => import("./pages/UserPage"));

function PageFallback() {
  return (
    <div className="page">
      <div className="users-grid__loader" style={{ padding: "80px 0" }}>
        <Spinner size="lg" />
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="page">
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <p style={{ fontSize: 64, marginBottom: 16 }}>404</p>
        <p style={{ color: "var(--muted)", marginBottom: 24 }}>Страница не найдена</p>
        <a href="/" className="back-btn">← На главную</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="layout">
          <header className="header">
            <div className="header__inner">
              <a href="/" className="header__logo">
                <span className="header__logo-icon" aria-hidden="true">👥</span>
                <span>UserCatalog</span>
              </a>
            </div>
          </header>

          <main className="main">
            <ErrorBoundary>
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<UsersPage />} />
                  <Route path="/users/:id" element={<UserPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
