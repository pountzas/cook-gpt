import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("is accessible", () => {
    render(<TestButton>Accessible content</TestButton>);
    expect(screen.getByText("Accessible content")).toBeInTheDocument();
  });
});
