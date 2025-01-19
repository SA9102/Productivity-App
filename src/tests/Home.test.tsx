import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TaskForm from "../pages/TaskEntryPage";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import useTaskStore from "../store/taskStore";
import Home from "../pages/HomePage";
import dummyTasks from "../utils/dummyTasks";

const originalState = useTaskStore.getState();

const clickTaskMenuButton = async () => {
  const taskMenuButton = await screen.findByRole("button", { name: "more" });
  await userEvent.click(taskMenuButton);
  const editButton = await screen.findByRole("menuitem", { name: "Edit" });
  const deleteButton = await screen.findByRole("menuitem", {
    name: "Delete",
  });

  return { editButton, deleteButton };
};

describe("Home", () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: dummyTasks,
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

    const taskFoo = await screen.findByText("Foo");
    const taskBar = await screen.findByText("Bar");
    const taskQux = await screen.findByText("Qux");
    const taskBaz = screen.queryByText("Baz");

    expect(taskFoo).toBeInTheDocument();
    expect(taskBar).toBeInTheDocument();
    expect(taskQux).toBeInTheDocument();
    expect(taskBaz).not.toBeInTheDocument();
  });

  test("when a task item is clicked, it should toggle its 'isCompleted' value", async () => {
    render(<Stub />);
    const task = await screen.findByText("Foo");
    await userEvent.click(task);
    expect(useTaskStore.getState().tasks).toEqual([
      {
        id: "5",
        name: "Foo",
        category: "Travel",
        description: "Foobar",
        priority: 1,
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
        priority: 1,
        isComplete: false,
      },
    ]);
  });

  test("clicking on a task should open a menu with options to edit and delete it", async () => {
    render(<Stub />);

    const { editButton, deleteButton } = await clickTaskMenuButton();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("clicking 'delete' should delete the item", async () => {
    render(<Stub />);

    const { deleteButton } = await clickTaskMenuButton();
    await userEvent.click(deleteButton);
    expect(useTaskStore.getState().tasks).toEqual([]);
  });
});
