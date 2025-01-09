import { create } from "zustand";

import taskType from "../types/taskType";

type state = {
  tasks: taskType[];
  addTask: (task: taskType) => void;
  removeTask: (taskId: string) => void;
};

type actions = {
  addTask: (task: taskType) => void;
  updateTask: (updatedTask: taskType) => void;
  removeTask: (taskId: string) => void;
  toggleComplete: (taskId: string) => void;
  removeCompletedTasks: () => void;
};

const useTaskStore = create<state & actions>()((set) => ({
  // Stores all task items; they are objects of type taskType
  tasks: [],
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
  // Remove a task by id
  removeTask: (taskId: string) =>
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

  // Remove all completed tasks at once
  removeCompletedTasks: () =>
    set((state) => ({
      tasks: state.tasks.filter((task: taskType) => !task.isComplete),
    })),
}));

export default useTaskStore;
