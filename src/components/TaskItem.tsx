// MUI components
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
// Store
import useTaskStore from "../store/taskStore";
// Types
import taskType from "../types/taskType";
// React Routet
import { useNavigate } from "react-router";
// Utils
import { EDIT_TASK_ROUTE } from "../utils/fullRoutes";
// Other external packages
import { useLongPress } from "use-long-press";
import Menu from "./Menu";
import { useMemo } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";

type props = {
  task: taskType;
};

// Renders a 'task item' to the screen
const TaskItem = ({ task }: props) => {
  const toggleComplete = useTaskStore((state) => state.toggleComplete);
  const removeTask = useTaskStore((state) => state.removeTask);
  const navigate = useNavigate();
  const bind = useLongPress((taskId) => {
    console.log("USE LONG PRESS");
    console.log(taskId);
    navigate(`${EDIT_TASK_ROUTE}/${taskId}`);
  });

  const menuItems = useMemo(
    () => [
      {
        name: "Edit",
        onClick: () => {
          navigate(`${EDIT_TASK_ROUTE}/${task.id}`);
        },
      },
      {
        name: "Delete",
        onClick: () => {
          removeTask(task.id);
        },
      },
    ],
    [navigate, task.id]
  );

  return (
    <Card
      variant="outlined"
      key={task.id}
      onClick={() => toggleComplete(task.id)}
      {...bind(task.id)}
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <CardContent>
        {task.isComplete ? (
          <Typography sx={{ textDecoration: "line-through" }}>
            {task.name}
          </Typography>
        ) : (
          <Typography>{task.name}</Typography>
        )}
      </CardContent>
      <CardActions>
        <Menu menuItems={menuItems} />
      </CardActions>
    </Card>
  );
};

export default TaskItem;
