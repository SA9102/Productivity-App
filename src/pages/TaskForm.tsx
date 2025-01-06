// React hook imports
import { useState } from "react";

// MUI imports
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
  Typography,
  Box,
  Container,
  Toolbar,
  Alert,
  InputLabel,
} from "@mui/material";

// React Router imports
import { Link, NavLink, Router, useNavigate } from "react-router";

// Type imports
import taskType from "../types/taskType";

// Util imports
import getEmptyTask from "../utils/getEmptyTask";
import { HOME } from "../utils/paths";

// Store imports
import useTaskStore from "../store/taskStore";

// Custom component imports
import Drawer from "../components/Drawer";
import { dark } from "@mui/material/styles/createPalette";

// This component renders the input fields for a task.
// This is used either when adding a new task, or when editing a task that exists.
const TaskForm = () => {
  const [task, setTask] = useState<taskType>(getEmptyTask());

  const addTask = useTaskStore((state) => state.addTask);
  const navigate = useNavigate();

  const [priority, setPriority] = useState<1 | 2 | 3>(1);

  return (
    // <Container maxWidth="sm">
    <>
      {/* <Drawer /> */}
      <Typography variant="h4" component="h1" textAlign="center" mb={3}>
        Add Task
      </Typography>
      <FormControl fullWidth sx={{ display: "flex", gap: "1rem" }}>
        <TextField
          variant="outlined"
          id="task-name-input"
          label="Name"
          aria-describedby="enter-task-name-here"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          required
        />
        <TextField
          variant="outlined"
          id="task-description-input"
          label="Description"
          aria-describedby="enter-task-description-here"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          multiline
          rows={8}
        />
        <TextField select label="Category" defaultValue="None">
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="travel">Travel</MenuItem>
        </TextField>
        <ButtonGroup variant="contained">
          <Button
            onClick={() => setPriority(1)}
            color={priority === 1 ? "secondary" : "primary"}
          >
            Low
          </Button>
          <Button
            onClick={() => setPriority(2)}
            color={priority === 2 ? "secondary" : "primary"}
          >
            Medium
          </Button>
          <Button
            onClick={() => setPriority(3)}
            color={priority === 3 ? "secondary" : "primary"}
          >
            High
          </Button>
        </ButtonGroup>
        <Button
          component={Link}
          to={HOME}
          variant="contained"
          onClick={() => addTask(task)}
          color="secondary"
        >
          Create Task
        </Button>
      </FormControl>
    </>
  );
};

export default TaskForm;
