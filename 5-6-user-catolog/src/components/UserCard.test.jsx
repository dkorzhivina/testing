import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserCard from "./UserCard";

const user = {
  id: 1,
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  avatar: "https://example.com/avatar.png",
};

describe("UserCard", () => {
  it("renders user name and email", () => {
    render(
      <MemoryRouter>
        <UserCard user={user} />
      </MemoryRouter>
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("links to user detail page", () => {
    render(
      <MemoryRouter>
        <UserCard user={user} />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /профиль john doe/i });
    expect(link).toHaveAttribute("href", "/users/1");
  });

  it("shows avatar with correct alt", () => {
    render(
      <MemoryRouter>
        <UserCard user={user} />
      </MemoryRouter>
    );
    const img = screen.getByRole("img", { name: /john doe/i });
    expect(img).toHaveAttribute("src", user.avatar);
  });
});
