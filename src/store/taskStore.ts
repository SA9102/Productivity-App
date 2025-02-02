import { create } from "zustand";

import taskType from "../types/taskType";
import dummyTasks from "../utils/dummyTasks";

type state = {
  tasks: taskType[];
};

type actions = {
  deleteCompletedTasks: () => void;
  addTask: (task: taskType) => void;
  updateTask: (updatedTask: taskType) => void;
  deleteTask: (taskId: string) => void;
  removeCategory: (categoryId: string) => void; // When a category is deleted, make sure that all tasks that
  // were pointing to this category, don't point to it anymore
  toggleComplete: (taskId: string) => void;
  sortTasks: (criterion: "name" | "priority") => void;
  getTasksNumber: () => number;
  getCompletedTasksNumber: () => number;
};

const a = (x) => {
  const criterion = x;

  return (taskA: taskType, taskB: taskType) => {
    if (criterion === "name") {
      if (taskA.name < taskB.name) {
        return -1;
      }

      if (taskA.name > taskB.name) {
        return 1;
      }

      return 0;
    } else if (criterion == "priority") {
      console.log("PRIORITY");
    }
  };
};

const compaare = (taskA: taskType, taskB: taskType) => {
  if (taskA.name < taskB.name) {
    return -1;
  }

  if (taskA.name > taskB.name) {
    return 1;
  }

  return 0;
};

const useTaskStore = create<state & actions>()((set, get) => ({
  // Stores all task items; they are objects of type taskType
  // tasks: [],
  tasks: dummyTasks,
  // Add a task
  addTask: (task: taskType) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  updateTask: (updatedTask: taskType) =>
    set((state) => ({
      tasks: state.tasks.map((task: taskType) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      }),
    })),
  // Delete a task by id
  deleteTask: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task: taskType) => task.id !== taskId),
    })),

  // Toggle a task as complete/incomplete by id
  toggleComplete: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.map((task: taskType) => {
        if (task.id === taskId) {
          task.isComplete = !task.isComplete;
        }
        return task;
      }),
    })),

  // Delete all completed tasks at once
  deleteCompletedTasks: () =>
    set((state) => ({
      tasks: state.tasks.filter((task: taskType) => !task.isComplete),
    })),

  // Sorts tasks by a given criterion
  // sortTasks: () => {
  //   set((state) => ({
  //     tasks: state.tasks.sort(compare),
  //   }));
  // },
  removeCategory: (categoryId: string) =>
    set((state) => ({
      tasks: state.tasks.map((task: taskType) => {
        if (task.category === categoryId) {
          task.category = "";
        }
        return task;
      }),
    })),
  sortTasks: (criterion) => {
    const compare = (taskA: taskType, taskB: taskType) => {
      if (criterion === "name") {
        if (taskA.name < taskB.name) {
          return -1;
        }

        if (taskA.name > taskB.name) {
          return 1;
        }

        return 0;
      } else {
        return 0;
      }
    };

    set((state) => ({
      tasks: state.tasks.sort(compare),
    }));
  },

  getTasksNumber: () => get().tasks.length,

  getCompletedTasksNumber: () =>
    get().tasks.reduce((total, task) => {
      if (task.isComplete) {
        return total + 1;
      }
      return total;
    }, 0),
}));

export default useTaskStore;
