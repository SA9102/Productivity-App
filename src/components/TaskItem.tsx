/***
RENDERS A 'TASK ITEM' TO THE SCREEN.
***/

// React
import { useState } from "react";
// CSS
import TaskItemCSS from "./TaskItem.module.css";
// MUI components
import {
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
  Chip,
  Stack,
} from "@mui/material";
// MUI Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// MUI colours
import { grey, green, orange, red } from "@mui/material/colors";
// Store
import useTaskStore from "../store/taskStore";
import useCategoryStore from "../store/categoryStore";
// Types
import taskType from "../types/taskType";
// React Router
import { useNavigate } from "react-router";
// Utils
import { EDIT_TASK_ROUTE } from "../utils/fullRoutes";

type props = {
  task: taskType;
};

const TaskItem = ({ task }: props) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const toggleComplete = useTaskStore((state) => state.toggleComplete);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const navigate = useNavigate();

  const categories = useCategoryStore((state) => state.categories);

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

  const getCategoryById = (id: string) => {
    return categories.find((category) => category.id === id);
  };

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
          <Stack direction="row" gap="0.5rem" alignItems="center">
            <Typography>{task.name}</Typography>
            {task.category !== "" && (
              <Chip
                sx={{
                  fontSize: "0.7rem", // Adjust the font size
                  height: "18px", // Adjust the height
                  padding: "0", // Adjust padding
                  backgroundColor: getCategoryById(task.category)!.colour,
                }}
                size="small"
                label={getCategoryById(task.category)!.name}
              />
            )}
          </Stack>
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
  );
};

export default TaskItem;
