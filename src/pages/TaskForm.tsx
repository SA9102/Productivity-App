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
  AppBar,
  Container,
  Toolbar,
  Alert,
} from "@mui/material";

// React Router imports
import { Link, NavLink } from "react-router";

// Type imports
import taskType from "../types/taskType";

// Util imports
import emptyTask from "../utils/emptyTask";
import { home } from "../utils/paths";

// Store imports
import useTaskStore from "../store/taskStore";

// Custom component imports
import TopBar from "../components/TopBar";

// This component renders the input fields for a task.
// This is used either when adding a new task, or when editing a task that exists.
const TaskInput = () => {
  const [task, setTask] = useState<taskType>(emptyTask);

  const addTask = useTaskStore((state) => state.addTask);

  return (
    // <Container maxWidth="sm">
    <Box>
      <TopBar title="Add Task" />

      <FormControl fullWidth>
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
        <Select label="Category">
          <MenuItem value="travel">Travel</MenuItem>
        </Select>
        <ButtonGroup variant="contained">
          <Button>Low</Button>
          <Button>Medium</Button>
          <Button>High</Button>
        </ButtonGroup>
        <Button
          component={Link}
          to={home}
          variant="contained"
          onClick={() => addTask(task)}
        >
          Add Task
        </Button>
        <Button component={Link} to={home} variant="contained">
          Back
        </Button>
      </FormControl>
    </Box>
  );
};

export default TaskInput;
