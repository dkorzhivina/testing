import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders nothing when totalPages is 1", () => {
    const { container } = render(
      <Pagination page={1} totalPages={1} onPageChange={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders prev/next and page buttons when totalPages > 1", () => {
    render(<Pagination page={1} totalPages={3} onPageChange={vi.fn()} />);
    expect(screen.getByRole("navigation", { name: /пагинация/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/предыдущая/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/следующая/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
  });

  it("calls onPageChange with next page when next is clicked", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={3} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByLabelText(/следующая/i));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with previous page when prev is clicked", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={3} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByLabelText(/предыдущая/i));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("disables prev on first page", () => {
    render(<Pagination page={1} totalPages={2} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText(/предыдущая/i)).toBeDisabled();
    expect(screen.getByLabelText(/следующая/i)).not.toBeDisabled();
  });

  it("disables next on last page", () => {
    render(<Pagination page={2} totalPages={2} onPageChange={vi.fn()} />);
    expect(screen.getByLabelText(/следующая/i)).toBeDisabled();
    expect(screen.getByLabelText(/предыдущая/i)).not.toBeDisabled();
  });
});
