import { Stack } from "@mui/material";
import TaskItem from "./TaskItem";
import useTaskStore from "../store/taskStore";
import useFilterTasks from "../hooks/useFilterTasks";

type props = {
  filter: string;
};

// Renders a list of task items
const TasksList = ({ filter }: props) => {
  const tasks = useFilterTasks(filter);
  return (
    <Stack gap="0.5rem">
      {tasks.map((task) => (
        <TaskItem task={task} />
      ))}
    </Stack>
  );
};

export default TasksList;
