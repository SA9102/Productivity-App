import tasksFilterType from "../types/tasksFilterType";

const defaultTasksFilters: tasksFilterType = {
  text: "",
  priority: {
    none: true,
    low: true,
    medium: true,
    high: true,
  },
};

export default defaultTasksFilters;
