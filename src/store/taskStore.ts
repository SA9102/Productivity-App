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
  toggleComplete: (taskId: string) => void;
  sortTasks: () => void;
  // sortTasks: (criterion: "name" | "priority") => void;
};

const compare = (taskA: taskType, taskB: taskType) => {
  if (taskA.name < taskB.name) {
    return -1;
  }

  if (taskA.name > taskB.name) {
    return 1;
  }

  return 0;
};

const useTaskStore = create<state & actions>()((set) => ({
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

  sortTasks: () =>
    set((state) => ({
      tasks: state.tasks.sort(compare),
    })),
}));

export default useTaskStore;
