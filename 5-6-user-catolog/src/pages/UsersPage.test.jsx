import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ToastProvider } from "../context/ToastContext";
import { clearSessionCache } from "../api/usersApi";
import UsersPage from "./UsersPage";

function Wrapper({ children }) {
  return (
    <MemoryRouter>
      <ToastProvider>{children}</ToastProvider>
    </MemoryRouter>
  );
}

describe("UsersPage (integration)", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    clearSessionCache();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows loading then user list when fetch succeeds", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([
          { id: 1, name: "Leanne Graham", email: "a@b.com" },
          { id: 2, name: "Ervin Howell", email: "b@c.com" },
        ]),
    });

    render(<UsersPage />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });
    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
    expect(screen.getByText("a@b.com")).toBeInTheDocument();
  });

  it("shows error state and retry button when fetch fails", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<UsersPage />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText(/не удалось загрузить данные/i)).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /повторить/i })).toBeInTheDocument();
  });

  it("search input filters placeholder and value", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ id: 1, name: "Leanne Graham", email: "a@b.com" }]),
    });

    render(<UsersPage />, { wrapper: Wrapper });
    await waitFor(() => {
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });

    const search = screen.getByPlaceholderText(/поиск по имени или email/i);
    expect(search).toHaveAttribute("aria-label", "Поиск пользователей");
    await userEvent.type(search, "test");
    expect(search).toHaveValue("test");
  });
});
