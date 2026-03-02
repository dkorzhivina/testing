import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import UsersPage from "./pages/UsersPage";
import UserPage from "./pages/UserPage";
import "./App.css";

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
            <Routes>
              <Route path="/" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="*" element={
                <div className="page">
                  <div style={{ textAlign: "center", padding: "80px 20px" }}>
                    <p style={{ fontSize: 64, marginBottom: 16 }}>404</p>
                    <p style={{ color: "var(--muted)", marginBottom: 24 }}>Страница не найдена</p>
                    <a href="/" className="back-btn">← На главную</a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
