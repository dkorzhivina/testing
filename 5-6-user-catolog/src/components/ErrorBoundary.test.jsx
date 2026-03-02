import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "./ErrorBoundary";

function Thrower() {
  throw new Error("test error");
}

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <span>Child content</span>
      </ErrorBoundary>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("renders fallback UI when child throws", () => {
    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    );
    expect(screen.getByText(/что-то пошло не так/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /попробовать снова/i })).toBeInTheDocument();
  });

  it("calls onError when child throws", () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <Thrower />
      </ErrorBoundary>
    );
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });

  it("resets state and re-renders children when retry is clicked", async () => {
    let shouldThrow = true;
    function ConditionalThrower() {
      if (shouldThrow) throw new Error("boom");
      return <span>Recovered</span>;
    }
    render(
      <ErrorBoundary>
        <ConditionalThrower />
      </ErrorBoundary>
    );
    expect(screen.getByText(/что-то пошло не так/i)).toBeInTheDocument();
    shouldThrow = false;
    await userEvent.click(screen.getByRole("button", { name: /попробовать снова/i }));
    expect(screen.getByText("Recovered")).toBeInTheDocument();
  });
});
