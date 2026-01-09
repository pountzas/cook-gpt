import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestButton } from "./TestButton";

describe("TestButton", () => {
  it("renders without crashing", () => {
    render(<TestButton>Test Content</TestButton>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies correct Tailwind classes", () => {
    const { container } = render(<TestButton>Test</TestButton>);
    expect(container.firstChild).toHaveClass("inline-flex");
    expect(container.firstChild).toHaveClass("bg-blue-600");
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<TestButton onClick={handleClick}>Click me</TestButton>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has correct aria-disabled when disabled", () => {
    render(<TestButton disabled>Disabled Button</TestButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("has correct aria-disabled when loading", () => {
    render(<TestButton loading>Loading Button</TestButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("handles keyboard Enter key", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<TestButton onClick={handleClick}>Keyboard Test</TestButton>);
    const button = screen.getByRole("button");

    button.focus();
    await user.keyboard("{Enter}");

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles keyboard Space key", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<TestButton onClick={handleClick}>Keyboard Test</TestButton>);
    const button = screen.getByRole("button");

    button.focus();
    await user.keyboard(" ");

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("receives focus when tabbed to", async () => {
    const user = userEvent.setup();
    render(<TestButton>Focus Test</TestButton>);
    const button = screen.getByRole("button");

    await user.tab();

    expect(button).toHaveFocus();
  });

  it("announces loading state to screen readers", () => {
    render(<TestButton loading>Loading Button</TestButton>);
    const button = screen.getByRole("button");

    // Check that button has aria-disabled for screen readers
    expect(button).toHaveAttribute("aria-disabled", "true");

    // Check that loading spinner has aria-hidden to not interfere with screen readers
    const spinner = document.querySelector("svg");
    expect(spinner).toHaveAttribute("aria-hidden", "true");
  });
});
