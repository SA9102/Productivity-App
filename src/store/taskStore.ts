import { create } from "zustand";

import taskType from "../types/taskType";

type state = {
  tasks: taskType[];
  addTask: (task: taskType) => void;
  removeTask: (taskId: string) => void;
};

type actions = {
  addTask: (task: taskType) => void;
  removeTask: (taskId: string) => void;
  toggleComplete: (taskId: string) => void;
  removeCompletedTasks: () => void;
};

const useTaskStore = create<state & actions>()((set) => ({
  tasks: [],
  addTask: (task: taskType) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  removeTask: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task: taskType) => task.id !== taskId),
    })),
  toggleComplete: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.map((task: taskType) => {
        if (task.id === taskId) {
          task.isComplete = !task.isComplete;
        }
        return task;
      }),
    })),
  removeCompletedTasks: () =>
    set((state) => ({
      tasks: state.tasks.filter((task: taskType) => !task.isComplete),
    })),
}));

export default useTaskStore;
