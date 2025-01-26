import TaskItemCSS from "./TaskItem.module.css";

// MUI components
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Paper,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Stack,
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
import { Link, useNavigate } from "react-router";
// Utils
import { EDIT_TASK_ROUTE } from "../utils/fullRoutes";
// Other external packages
import { useLongPress } from "use-long-press";
import { useMemo, useState } from "react";
import { grey, green, orange, red } from "@mui/material/colors";

type props = {
  task: taskType;
};

// Renders a 'task item' to the screen
const TaskItem = ({ task }: props) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const toggleComplete = useTaskStore((state) => state.toggleComplete);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const navigate = useNavigate();
  const bind = useLongPress((taskId) => {
    console.log("USE LONG PRESS");
    console.log(taskId);
    navigate(`${EDIT_TASK_ROUTE}/${taskId}`);
  });

  // The colour of the left border represents the priority,
  // or no colour if no priority. The colour shade depends on
  // whether the application is on light or dark mode. Return the
  // appropriate colour based on these factors.
  const getLeftBorderColour = () => {
    // If light mode
    if (theme.palette.mode === "light") {
      return task.priority === "low"
        ? green[200]
        : task.priority === "medium"
        ? orange[200]
        : task.priority === "high"
        ? red[200]
        : "transparent";
    }

    // If dark mode
    return task.priority === "low"
      ? green[800]
      : task.priority === "medium"
      ? orange[800]
      : task.priority === "high"
      ? red[800]
      : "transparent";
  };

  // const menuItems = useMemo(
  //   () => [
  //     {
  //       name: "Edit",
  //       onClick: () => {
  //         navigate(`${EDIT_TASK_ROUTE}/${task.id}`);
  //       },
  //     },
  //     {
  //       name: "Delete",
  //       onClick: () => {
  //         removeTask(task.id);
  //       },
  //     },
  //   ],
  //   [navigate, task.id]
  // );

  return (
    <>
      <Paper
        className={TaskItemCSS["task-item-container"]}
        draggable
        sx={{
          flex: 1,
          // height: "50px",
          backgroundColor:
            theme.palette.mode === "light" ? grey[100] : grey[900],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderLeftWidth: "5px",
          borderLeftStyle: "solid",
          borderLeftColor: getLeftBorderColour,
          opacity: task.isComplete ? "0.3" : "1",
          cursor: "pointer",
        }}
        onClick={() => toggleComplete(task.id)}
      >
        <Stack>
          <Typography>{task.name}</Typography>
          <Typography sx={{ fontSize: "0.7rem", fontWeight: "300" }}>
            {task.description}
          </Typography>
        </Stack>
        <Stack direction="row" className={TaskItemCSS["button-group"]}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              navigate(`${EDIT_TASK_ROUTE}/${task.id}`);
            }}
            className={TaskItemCSS["button"]}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task '{task.name}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deleteTask(task.id);
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setOpen(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
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
    // task.priority === "low"
    //   ? "2px solid green"
    //   : task.priority === "medium"
    //   ? "2px solid orange"
    //   : task.priority === "high"
    //   ? "2px solid red"
    //   : "",
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
