import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) this.props.onError(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="error-boundary" role="alert">
          <div className="error-boundary__icon">⚠</div>
          <h2 className="error-boundary__title">Что-то пошло не так</h2>
          <p className="error-boundary__text">
            Произошла непредвиденная ошибка. Попробуйте обновить страницу.
          </p>
          <button className="error-boundary__btn" onClick={this.handleRetry}>
            Попробовать снова
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
