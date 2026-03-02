import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StateMessage from "./StateMessage";

describe("StateMessage", () => {
  it("renders title and text", () => {
    render(<StateMessage title="Error" text="Something went wrong" />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders action button and calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(
      <StateMessage
        title="Retry"
        action={{ label: "Повторить", onClick }}
      />
    );
    const btn = screen.getByRole("button", { name: /повторить/i });
    expect(btn).toBeInTheDocument();
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders icon when provided", () => {
    render(<StateMessage icon="⚠" title="Warning" />);
    expect(screen.getByText("⚠")).toBeInTheDocument();
  });
});
