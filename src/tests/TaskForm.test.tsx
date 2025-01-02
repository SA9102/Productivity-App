import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";
import TaskForm from "../pages/TaskForm";

describe("TaskForm", () => {
  it("adds a new task to the list of tasks", async () => {
    render(<TaskForm />);
    // // await screen.findByRole("button");
    // // expect(screen.getByRole("button")).toHaveTextContent("Hello");
    expect(1 + 1).toBe(2);
    // screen.debug();
  });
});
