import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { createRoutesStub } from "react-router";
import useTaskStore from "../store/taskStore";
import Home from "../pages/HomePage/HomePage";
import dummyTasks from "../utils/dummyTasks";

// When the 'options' button for a task item (the three vertical dots) is clicked
// It will bring up a menu for the options for that tasks. We want to ensure that
// these options are indeed displayed. This function performs this action and
// returns the 'edit' and 'delete' buttons that are expected to be present.
const clickTaskMenuButton = async () => {
  // Find all 'option' buttons that are on the right side of the task
  const taskMenuButton = await screen.findAllByRole("button", { name: "more" });
  // It will find multiple, so we only select the FIRST one. It is the same for all
  // other tasks.
  await userEvent.click(taskMenuButton[0]);
  const editButton = await screen.findByRole("menuitem", { name: "Edit" });
  const deleteButton = await screen.findByRole("menuitem", {
    name: "Delete",
  });

  return { editButton, deleteButton };
};

describe("Home", () => {
  // Before each test, we set an array of dummy tasks to be the state.
  beforeEach(() => {
    useTaskStore.setState({
      tasks: dummyTasks,
    });
  });

  // Before each test, we render the Home component.
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: Home,
      action() {
        return {};
      },
    },
  ]);

  it("should display all task names that are in the global state without any filters applied", async () => {
    render(<Stub />);

    const tasks = useTaskStore.getState().tasks;

    // Wait for all tasks to appear on the screen
    const taskNames = await Promise.all(
      tasks.map((task) => screen.findByText(task.name))
    );

    // Assert that all task names are in the document
    taskNames.forEach((taskName) => {
      expect(taskName).toBeInTheDocument();
    });

    const taskNA = screen.queryByText("N/A");
    expect(taskNA).not.toBeInTheDocument();
  });

  // test("when a task item is clicked, it should toggle its 'isCompleted' value", async () => {
  //   render(<Stub />);
  //   const task = await screen.findByText("Foo");
  //   await userEvent.click(task);
  //   expect(useTaskStore.getState().tasks).toEqual([
  //     {
  //       id: "5",
  //       name: "Foo",
  //       category: "Travel",
  //       description: "Foobar",
  //       priority: 1,
  //       isComplete: true,
  //     },
  //   ]);
  //   await userEvent.click(task);
  //   expect(useTaskStore.getState().tasks).toEqual([
  //     {
  //       id: "5",
  //       name: name,
  //       category: "Travel",
  //       description: "Foobar",
  //       priority: 1,
  //       isComplete: false,
  //     },
  //   ]);
  // });

  test("clicking on a task should open a menu with options to edit and delete it", async () => {
    render(<Stub />);

    // The 'edit' and 'delete' buttons for a task item are expected to be shown when the
    // user clicks on its 'options' button.
    const { editButton, deleteButton } = await clickTaskMenuButton();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("clicking 'delete' should delete the item", async () => {
    render(<Stub />);
    const tasks = useTaskStore.getState().tasks;

    // Essentially removes the FIRST task in the list as the test will delete the FIRST one
    const allExceptFirst = tasks.slice(1);

    const { deleteButton } = await clickTaskMenuButton();
    await userEvent.click(deleteButton);

    // The first task item should now have been removed from state.
    expect(useTaskStore.getState().tasks).toEqual(allExceptFirst);
  });

  // it("should display only the appropriate tasks when a text filter is applied on the name/description", async () => {
  //   render(<Stub />);

  //   const tasks = useTaskStore.getState().tasks;
  //   const filterTextInput = await screen.findByRole("textbox", {
  //     name: "Filter",
  //   });

  //   const filterText = "bAr";
  //   await userEvent.type(filterTextInput, filterText);

  //   // We then divide the tasks into two; the ones that satisfy the filter, and the
  //   // ones that do not. We will check to see if the former are rendered onto the
  //   // screen, and the latter are not.
  //   const expectedfilteredTasksTrue = [];
  //   const expectedfilteredTasksFalse = [];

  //   tasks.forEach((task) => {
  //     if (
  //       task.name.toLowerCase().trim() === filterText.toLowerCase().trim() ||
  //       task.description.toLowerCase().trim() ===
  //         filterText.toLowerCase().trim()
  //     ) {
  //       expectedfilteredTasksTrue.push(task);
  //     } else {
  //       expectedfilteredTasksFalse.push(task);
  //     }
  //   });

  //   const x = await Promise.all(
  //     expectedfilteredTasksTrue.map((task) => screen.findByText(task.name))
  //   );

  //   const y = expectedfilteredTasksFalse.map((task) =>
  //     screen.queryByText(task.name)
  //   );

  //   x.forEach((y) => {
  //     expect(y).toBeInTheDocument();
  //   });

  //   y.forEach((z) => {
  //     expect(z).not.toBeInTheDocument();
  //   });
  // });
});
