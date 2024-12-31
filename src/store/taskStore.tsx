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
}));

export default useTaskStore;
