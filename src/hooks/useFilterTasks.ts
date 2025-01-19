import useTaskStore from "../store/taskStore";

const useFilterTasks = (filter: string) => {
  const tasks = useTaskStore((state) => state.tasks);

  if (filter === "") {
    return tasks;
  }

  const tasksFiltered = tasks.filter(
    (task) =>
      task.name.toLowerCase().includes(filter) ||
      task.description.toLowerCase().includes(filter)
  );

  return tasksFiltered;
};

export default useFilterTasks;
