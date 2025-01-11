import { render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import TaskEntry from "../pages/TaskEntryPage";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import useTaskStore from "../store/taskStore";

const originalState = useTaskStore.getState();

describe("TaskEntry", () => {
  beforeEach(() => {
    useTaskStore.setState(originalState);
  });

  const Stub = createRoutesStub([
    {
      path: "/add-task",
      Component: TaskEntry,
      action() {
        return {};
      },
    },
  ]);

  test("when a task is created with a given name, it should add a 'task item' to the global state 'tasks' with that given name", async () => {
    render(<Stub initialEntries={["/add-task"]} />);

    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const addTaskButton = screen.getByRole("link", { name: "Create Task" });

    await userEvent.type(nameInput, "Foobar");
    await userEvent.click(addTaskButton);

    const currentTasksState = useTaskStore.getState().tasks;

    expect(currentTasksState).toContainEqual(
      expect.objectContaining({ name: "Foobar" })
    );
    expect(currentTasksState).not.toContainEqual(
      expect.objectContaining({ name: "foobar" })
    );
    expect(currentTasksState).not.toContainEqual(
      expect.objectContaining({ name: "" })
    );
  });

  
});
