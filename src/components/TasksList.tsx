import { Stack } from "@mui/material";
import TaskItem from "./TaskItem";
import useTaskStore from "../store/taskStore";

// Renders a list of task items
const TasksList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  return (
    <Stack gap="0.5rem">
      {tasks.map((task) => (
        <TaskItem task={task} />
      ))}{" "}
    </Stack>
  );
};

export default TasksList;
