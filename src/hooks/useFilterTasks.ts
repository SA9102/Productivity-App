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
        task.name
          .toLowerCase()
          .trim()
          .includes(filter.text.toLowerCase().trim()) ||
        task.description
          .toLowerCase()
          .trim()
          .includes(filter.text.toLowerCase().trim())
    );
  }

  // Filter the existing 'taskFiltered' by priority
  // You can show tasks with one or more of: none, low, medium, high
  // Get the task's priority, then if that priority is 'true' within 'filter',
  // then keep this task.
  tasksFiltered = tasksFiltered.filter(
    (task) => filter.priority[task.priority]
  );

  return tasksFiltered;
};

export default useFilterTasks;
