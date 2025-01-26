// MUI
import {
  Box,
  Typography,
  Fab,
  TextField,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  LinearProgress,
} from "@mui/material";
// Icons
import AddIcon from "@mui/icons-material/Add";

import GridViewIcon from "@mui/icons-material/GridView";
// React Router
import { NavLink } from "react-router";
// Store
import useTaskStore from "../../store/taskStore";
// Utils
import { ADD_TASK_ROUTE } from "../../utils/fullRoutes";
import TasksList from "../../components/TasksList";
// Custom hooks
import useTaskFilterStorage from "../../hooks/useTaskFilterStorage";
import { useState } from "react";

import tasksLayoutType from "../../types/tasksLayoutType";
import Toolbar from "./Toolbar";

const HomePage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const sortTasks = useTaskStore((state) => state.sortTasks);
  const [filter, setFilter] = useTaskFilterStorage();
  const [tasksLayout, setTasksLayout] = useState<tasksLayoutType>("list");

  const handleChangeLayout = (e, newLayout: tasksLayoutType) => {
    if (newLayout !== null) {
      setTasksLayout(newLayout);
    }
  };

  return (
    <Stack gap="1rem" maxWidth="900px">
      <Typography
        variant="h4"
        component="h1"
        alignSelf="center"
        textAlign="center"
      >
        Tasks
      </Typography>
      {tasks.length === 0 ? (
        <Typography textAlign="center">
          You don't have any tasks to do.
        </Typography>
      ) : (
        <>
          <Stack direction="row" gap="1rem" alignItems="center"></Stack>
          {/* TOOLBAR */}
          <Toolbar
            tasksLayout={tasksLayout}
            onChangeLayout={handleChangeLayout}
          />
          <TasksList filter={filter} view={tasksLayout} />
        </>
      )}
      {/* <NavLink
        to={ADD_TASK_ROUTE}
        onClick={() =>
          localStorage.setItem("taskFilter", JSON.stringify(filter))
        }
      >
        <Fab
          sx={{ position: "fixed", bottom: "30px", right: "30px" }}
          color="primary"
          aria-label="add-task"
        >
          <AddIcon />
        </Fab>
      </NavLink> */}
    </Stack>
  );
};

export default HomePage;
