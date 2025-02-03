/***
RENDERS A LIST OF 'TASK ITEM' COMPONENTS.
***/

// MUI
import { Stack } from "@mui/material";
// Custom components
import TaskItem from "./TaskItem";
// Custom hooks
import useFilterTasks from "../hooks/useFilterTasks";
// Custom types
import taskFilterType from "../types/tasksFilterType";
import tasksViewType from "../types/tasksLayoutType";

type props = {
  filter: taskFilterType;
  view: tasksViewType;
};

const TasksList = ({ filter, view }: props) => {
  const tasks = useFilterTasks(filter);
  return (
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
