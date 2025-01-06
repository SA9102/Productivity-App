import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TaskForm from "../pages/TaskForm";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import useTaskStore from "../store/taskStore";
import Home from "../pages/Home";

const originalState = useTaskStore.getState();

describe("Home", () => {
  const name = "Foo";

  beforeEach(() => {
    useTaskStore.setState({
      tasks: [
        {
          id: "5",
          name: name,
          category: "Travel",
          description: "Foobar",
          isComplete: false,
        },
      ],
    });
  });

  const Stub = createRoutesStub([
    {
      path: "/",
      Component: Home,
      action() {
        return {};
      },
    },
  ]);

  it("should display all task names that are in the global state", async () => {
    render(<Stub />);

    const task = await screen.findByText(name);

    expect(task).toBeInTheDocument();
  });

  test("when a task item is clicked, it should toggle its 'isCompleted' value", async () => {
    render(<Stub />);
    const task = await screen.findByText(name);
    await userEvent.click(task);
    expect(useTaskStore.getState().tasks).toEqual([
      {
        id: "5",
        name: name,
        category: "Travel",
        description: "Foobar",
        isComplete: true,
      },
    ]);
    await userEvent.click(task);
    expect(useTaskStore.getState().tasks).toEqual([
      {
        id: "5",
        name: name,
        category: "Travel",
        description: "Foobar",
        isComplete: false,
      },
    ]);
  });
});
