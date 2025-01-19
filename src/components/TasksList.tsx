// MUI
import { Stack } from "@mui/material";
// Custom components
import TaskItem from "./TaskItem";
// Custom hooks
import useFilterTasks from "../hooks/useFilterTasks";
// Custom types
import taskFilterType from "../types/taskFilterType";

type props = {
  filter: taskFilterType;
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
