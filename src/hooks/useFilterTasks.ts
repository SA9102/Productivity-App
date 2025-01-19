import useTaskStore from "../store/taskStore";
import taskFilterType from "../types/taskFilterType";

const useFilterTasks = (filter: taskFilterType) => {
  // Grab all tasks from global state
  let tasksFiltered = useTaskStore((state) => state.tasks);

  // Filter by text within the name or description
  // (or skip this step if nothing is entered)
  if (filter.text !== "") {
    tasksFiltered = tasksFiltered.filter(
      (task) =>
        task.name.toLowerCase().includes(filter.text) ||
        task.description.toLowerCase().includes(filter.text)
    );
  }

  // Filter the existing 'taskFiltered' by priority

  tasksFiltered = tasksFiltered.filter(
    (task) => filter.priority[task.priority]
  );

  return tasksFiltered;
};

export default useFilterTasks;
