// MUI
import { Paper, Stack, useTheme } from "@mui/material";
// Custom components
import TaskItem from "./TaskItem";
// Custom hooks
import useFilterTasks from "../hooks/useFilterTasks";
// Custom types
import taskFilterType from "../types/taskFilterType";
import { grey } from "@mui/material/colors";

type props = {
  filter: taskFilterType;
};

// Renders a list of task items
const TasksList = ({ filter }: props) => {
  const theme = useTheme();
  const tasks = useFilterTasks(filter);
  return (
    // <Paper
    //   sx={{
    //     backgroundColor: theme.palette.mode === "light" ? grey[100] : grey[800],
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: "0.5rem",
    //   }}
    // >
    //   {tasks.map((task) => (
    //     <TaskItem task={task} />
    //   ))}
    // </Paper>
    <Stack gap="0.5rem">
      {tasks.map((task) => (
        <TaskItem task={task} />
      ))}
    </Stack>
  );
};

export default TasksList;
