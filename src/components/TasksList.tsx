// MUI
import { Paper, Stack, useTheme } from "@mui/material";
// Custom components
import TaskItem from "./TaskItem";
// Custom hooks
import useFilterTasks from "../hooks/useFilterTasks";
// Custom types
import taskFilterType from "../types/tasksFilterType";
import tasksViewType from "../types/tasksLayoutType";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import useTaskStore from "../store/taskStore";

type props = {
  filter: taskFilterType;
  view: tasksViewType;
};

// Renders a list of task items
const TasksList = ({ filter, view }: props) => {
  const theme = useTheme();
  // const sortTasks = useTaskStore((state) => state.sortTasks);
  // sortTasks();
  // const tasks = useTaskStore((state) => state.tasks);
  const tasks = useFilterTasks(filter);

  // const [draggedIndex, setDraggedIndex] = useState(null);

  // const handleDragStart = (index) => {
  //   setDraggedIndex(index);
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleDrop = (index) => {
  //   const updatedItems = [...tasks];
  //   const [draggedItem] = updatedItems.splice(draggedIndex, 1);
  //   updatedItems.splice(index, 0, draggedItem);

  //   setItem(updatedItems);
  //   setDraggedIndex(null);
  // };

  // const onDragStart = (e, id) => {
  //   e.transfer
  // }
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
    <>
      {view === "list" ? (
        <Stack gap="0.5rem">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Stack>
      ) : (
        <Stack
          gap="0.5rem"
          direction="row"
          flexWrap="wrap"
          alignContent="center"
        >
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </Stack>
      )}
    </>
  );
};

export default TasksList;
