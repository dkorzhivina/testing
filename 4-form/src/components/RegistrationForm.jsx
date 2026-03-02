import { useState } from "react";
import "./RegistrationForm.css";

const FIELDS = {
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
  password: "",
  confirm: "",
  agree: false,
};

function getPasswordStrength(password) {
  if (!password) return null;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const score = [hasLower, hasUpper, hasDigit, hasSpecial, password.length >= 8].filter(Boolean).length;
  if (score <= 2) return "weak";
  if (score <= 3) return "medium";
  return "strong";
}

function validate(values) {
  const errors = {};

  if (!values.firstName.trim()) errors.firstName = "Введите имя";
  if (!values.lastName.trim()) errors.lastName = "Введите фамилию";

  if (!values.email.trim()) {
    errors.email = "Введите email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Некорректный email";
  }

  if (!values.birthDate) {
    errors.birthDate = "Введите дату рождения";
  } else {
    const birth = new Date(values.birthDate);
    const now = new Date();
    const age = now.getFullYear() - birth.getFullYear();
    if (birth > now) errors.birthDate = "Дата не может быть в будущем";
    else if (age < 14) errors.birthDate = "Минимальный возраст — 14 лет";
  }

  if (!values.password) {
    errors.password = "Введите пароль";
  } else if (values.password.length < 8) {
    errors.password = "Минимум 8 символов";
  } else if (!/\d/.test(values.password)) {
    errors.password = "Пароль должен содержать хотя бы одну цифру";
  }

  if (!values.confirm) {
    errors.confirm = "Подтвердите пароль";
  } else if (values.confirm !== values.password) {
    errors.confirm = "Пароли не совпадают";
  }

  if (!values.agree) errors.agree = "Необходимо согласие с условиями";

  return errors;
}

export default function RegistrationForm() {
  const [values, setValues] = useState(FIELDS);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strength = getPasswordStrength(values.password);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const next = { ...values, [name]: type === "checkbox" ? checked : value };
    setValues(next);
    if (touched[name]) {
      const errs = validate(next);
      setErrors(prev => {
        const updated = { ...prev };
        if (errs[name]) updated[name] = errs[name];
        else delete updated[name];
        return updated;
      });
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errs = validate(values);
    setErrors(prev => {
      const updated = { ...prev };
      if (errs[name]) updated[name] = errs[name];
      else delete updated[name];
      return updated;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const allTouched = Object.keys(FIELDS).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  }

  function handleReset() {
    setValues(FIELDS);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="page-wrapper">
        <div className="form-card">
          <div className="success-screen">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Готово!</h2>
            <p className="success-text">
              Добро пожаловать,{" "}
              <span className="success-name">{values.firstName} {values.lastName}</span>!<br />
              Аккаунт для <strong>{values.email}</strong> успешно создан.
            </p>
            <button className="success-back-btn" onClick={handleReset}>
              Зарегистрировать ещё
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <div className="form-logo" aria-hidden="true">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z"/>
          </svg>
        </div>

        <h1 className="form-heading">Регистрация</h1>
        <p className="form-subheading">Создайте аккаунт — это займёт минуту</p>

        <form onSubmit={handleSubmit} noValidate aria-label="Форма регистрации">
          <div className="form-row">
            <div className="field">
              <label htmlFor="firstName">Имя <span aria-hidden="true">*</span></label>
              <div className="input-wrap">
                <span className="field-icon" aria-hidden="true">👤</span>
                <input
                  id="firstName"
                  name="firstName"
                  className={`field-input${errors.firstName && touched.firstName ? " field-input--error" : ""}`}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Иван"
                  autoComplete="given-name"
                  aria-required="true"
                  aria-invalid={!!(errors.firstName && touched.firstName)}
                  aria-describedby={errors.firstName && touched.firstName ? "firstName-error" : undefined}
                />
              </div>
              {errors.firstName && touched.firstName && (
                <span id="firstName-error" className="error-msg" role="alert">{errors.firstName}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="lastName">Фамилия <span aria-hidden="true">*</span></label>
              <div className="input-wrap">
                <span className="field-icon" aria-hidden="true">👤</span>
                <input
                  id="lastName"
                  name="lastName"
                  className={`field-input${errors.lastName && touched.lastName ? " field-input--error" : ""}`}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Иванов"
                  autoComplete="family-name"
                  aria-required="true"
                  aria-invalid={!!(errors.lastName && touched.lastName)}
                  aria-describedby={errors.lastName && touched.lastName ? "lastName-error" : undefined}
                />
              </div>
              {errors.lastName && touched.lastName && (
                <span id="lastName-error" className="error-msg" role="alert">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
            <div className="input-wrap">
              <span className="field-icon" aria-hidden="true">✉</span>
              <input
                id="email"
                name="email"
                type="email"
                className={`field-input${errors.email && touched.email ? " field-input--error" : ""}`}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="ivan@example.com"
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!(errors.email && touched.email)}
                aria-describedby={errors.email && touched.email ? "email-error" : undefined}
              />
            </div>
            {errors.email && touched.email && (
              <span id="email-error" className="error-msg" role="alert">{errors.email}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="birthDate">Дата рождения <span aria-hidden="true">*</span></label>
            <div className="input-wrap">
              <span className="field-icon" aria-hidden="true">📅</span>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                className={`field-input${errors.birthDate && touched.birthDate ? " field-input--error" : ""}`}
                value={values.birthDate}
                onChange={handleChange}
                onBlur={handleBlur}
                max={new Date().toISOString().split("T")[0]}
                autoComplete="bday"
                aria-required="true"
                aria-invalid={!!(errors.birthDate && touched.birthDate)}
                aria-describedby={errors.birthDate && touched.birthDate ? "birthDate-error" : undefined}
              />
            </div>
            {errors.birthDate && touched.birthDate && (
              <span id="birthDate-error" className="error-msg" role="alert">{errors.birthDate}</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="password">Пароль <span aria-hidden="true">*</span></label>
            <div className="input-wrap">
              <span className="field-icon" aria-hidden="true">🔒</span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`field-input${errors.password && touched.password ? " field-input--error" : ""}`}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Минимум 8 символов и 1 цифра"
                autoComplete="new-password"
                aria-required="true"
                aria-invalid={!!(errors.password && touched.password)}
                aria-describedby={[
                  errors.password && touched.password ? "password-error" : "",
                  values.password ? "password-strength" : "",
                ].filter(Boolean).join(" ") || undefined}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
            {errors.password && touched.password && (
              <span id="password-error" className="error-msg" role="alert">{errors.password}</span>
            )}
            {values.password && (
              <div id="password-strength" className="strength-bar-wrap" aria-live="polite">
                <div className="strength-bars" aria-hidden="true">
                  <div className={`strength-bar${strength ? ` strength-bar--${strength}` : ""}`} />
                  <div className={`strength-bar${strength === "medium" || strength === "strong" ? ` strength-bar--${strength}` : ""}`} />
                  <div className={`strength-bar${strength === "strong" ? " strength-bar--strong" : ""}`} />
                </div>
                <span className={`strength-label strength-label--${strength}`}>
                  {strength === "weak" && "Слабый пароль"}
                  {strength === "medium" && "Средний пароль"}
                  {strength === "strong" && "Надёжный пароль"}
                </span>
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="confirm">Подтвердите пароль <span aria-hidden="true">*</span></label>
            <div className="input-wrap">
              <span className="field-icon" aria-hidden="true">🔑</span>
              <input
                id="confirm"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                className={`field-input${errors.confirm && touched.confirm ? " field-input--error" : ""}`}
                value={values.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Повторите пароль"
                autoComplete="new-password"
                aria-required="true"
                aria-invalid={!!(errors.confirm && touched.confirm)}
                aria-describedby={errors.confirm && touched.confirm ? "confirm-error" : undefined}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowConfirm(v => !v)}
                aria-label={showConfirm ? "Скрыть пароль" : "Показать пароль"}
              >
                {showConfirm ? "🙈" : "👁"}
              </button>
            </div>
            {errors.confirm && touched.confirm && (
              <span id="confirm-error" className="error-msg" role="alert">{errors.confirm}</span>
            )}
          </div>

          <hr className="divider" />

          <div className="field field--checkbox">
            <label className="checkbox-label" htmlFor="agree">
              <input
                id="agree"
                name="agree"
                type="checkbox"
                className="checkbox-input"
                checked={values.agree}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={!!(errors.agree && touched.agree)}
                aria-describedby={errors.agree && touched.agree ? "agree-error" : undefined}
              />
              <span className={`checkbox-box${errors.agree && touched.agree ? " checkbox-box--error" : ""}`} aria-hidden="true" />
              <span className="checkbox-text">
                Я принимаю{" "}
                <a href="#" className="checkbox-link" tabIndex={0}>условия использования</a>
                {" "}и{" "}
                <a href="#" className="checkbox-link" tabIndex={0}>политику конфиденциальности</a>
              </span>
            </label>
            {errors.agree && touched.agree && (
              <span id="agree-error" className="error-msg" role="alert">{errors.agree}</span>
            )}
          </div>

          <button
            type="submit"
            className={`submit-btn${loading ? " submit-btn--loading" : ""}`}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <span className="btn-spinner" aria-hidden="true" />
            ) : null}
            {loading ? "Создаём аккаунт..." : "Создать аккаунт"}
          </button>
        </form>
      </div>
    </div>
  );
}
