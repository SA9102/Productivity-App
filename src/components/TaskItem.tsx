// MUI components
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
// MUI Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// Store
import useTaskStore from "../store/taskStore";
// Types
import taskType from "../types/taskType";
// React Router
import { useNavigate } from "react-router";
// Utils
import { EDIT_TASK_ROUTE } from "../utils/fullRoutes";
// Other external packages
import { useLongPress } from "use-long-press";
import Menu from "./Menu";
import { useMemo, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { grey } from "@mui/material/colors";

import Dialog from "./Dialog";

type props = {
  task: taskType;
};

// Renders a 'task item' to the screen
const TaskItem = ({ task }: props) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
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
    <>
      <Paper
        sx={{
          backgroundColor:
            theme.palette.mode === "light" ? grey[50] : grey[900],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>{task.name}</Typography>
        <IconButton>
          <DeleteIcon fontSize="small" onClick={() => setOpen(true)} />
        </IconButton>
      </Paper>
      <Dialog />
    </>
    // <Card
    //   variant="outlined"
    //   key={task.id}
    //   onClick={() => toggleComplete(task.id)}
    //   {...bind(task.id)}
    //   sx={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     borderLeft:
    //       task.priority === "low"
    //         ? "2px solid green"
    //         : task.priority === "medium"
    //         ? "2px solid orange"
    //         : task.priority === "high"
    //         ? "2px solid red"
    //         : "",
    //   }}
    // >
    //   <CardContent
    //     sx={{
    //       whiteSpace: "nowrap",
    //       overflow: "hidden",
    //     }}
    //   >
    //     {/* {task.isComplete ? (
    //       <Typography sx={{ textDecoration: "line-through" }}>
    //         {task.name}
    //       </Typography>
    //     ) : ( */}
    //     <>
    //       <Typography
    //         sx={{ textDecoration: task.isComplete && "line-through" }}
    //       >
    //         {task.name}
    //       </Typography>
    //       {/* <Typography sx={{ fontSize: "0.8rem" }}>
    //         {task.description}
    //       </Typography> */}
    //       {/* <Typography sx={{ fontSize: "0.8rem", fontStyle: "italic" }}>
    //         <AccessTimeIcon sx={{ fontSize: "0.8rem" }} /> Hello
    //       </Typography> */}
    //     </>
    //     {/* )} */}
    //   </CardContent>
    //   <CardActions>
    //     {/* <Menu menuItems={menuItems} /> */}
    //     <IconButton aria-label="edit">
    //       <EditIcon />
    //     </IconButton>
    //     <IconButton aria-label="delete" color="error">
    //       <DeleteIcon />
    //     </IconButton>
    //   </CardActions>
    // </Card>
  );
};

export default TaskItem;
