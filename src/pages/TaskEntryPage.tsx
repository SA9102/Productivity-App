// React hook imports
import { useEffect, useState } from "react";

// MUI imports
import {
  FormControl,
  TextField,
  MenuItem,
  ButtonGroup,
  Button,
  Typography,
} from "@mui/material";

// React Router imports
import { Link, useLocation, useNavigate } from "react-router";

// Type imports
import taskType from "../types/taskType";

// Util imports
import getEmptyTask from "../utils/getEmptyTask";
import { HOME_ROUTE } from "../utils/fullRoutes";

// Store imports
import useTaskStore from "../store/taskStore";
import getLastRouteSegment from "../utils/getLastRouteSegment";

// This component renders the input fields for a task.
// This is used either when adding a new task, or when editing a task that exists.
// The optional prop 'task' is an object of type 'taskType'. If a task is passed in,
// it will render a page to edit a task. But if 'task' is null, it will render a page
// to create a new task.
const TaskForm = () => {
  const route = useLocation().pathname;

  // const [taskInput, setTaskInput] = useState<taskType>(
  //   task === undefined ? getEmptyTask() : task
  // );

  const [taskInput, setTaskInput] = useState<taskType>(getEmptyTask());

  const addTask = useTaskStore((state) => state.addTask);
  const navigate = useNavigate();

  const [priority, setPriority] = useState<1 | 2 | 3>(1);

  /*
  When the page is rendered the first time, we get the route.
  If the route is /edit-task/:taskId, we get the task based on
  :taskId and set it to 'task' state so that it can be updated.
  Otherwise (when the route is /add-task), we set the 'task'
  state to be an empty task so that a new task can be created.
  */
  useEffect(() => {
    const lastRouteSegment = getLastRouteSegment(route);
    if (lastRouteSegment !== "add-task") {
      const tasks = useTaskStore.getState().tasks;
      const task = tasks.find((task) => task.id === lastRouteSegment);
      setTaskInput(task!);
    }
  }, []);

  return (
    // <Container maxWidth="sm">
    <>
      {/* <Drawer /> */}
      <Typography variant="h4" component="h1" textAlign="center" mb={3}>
        {/* {task === undefined ? "Add Task" : "Edit Task"} */}
        Add Task
      </Typography>
      <FormControl fullWidth sx={{ display: "flex", gap: "1rem" }}>
        <TextField
          variant="outlined"
          id="task-name-input"
          label="Name"
          aria-describedby="enter-task-name-here"
          value={taskInput.name}
          onChange={(e) => setTaskInput({ ...taskInput, name: e.target.value })}
          required
        />
        <TextField
          variant="outlined"
          id="task-description-input"
          label="Description"
          aria-describedby="enter-task-description-here"
          value={taskInput.description}
          onChange={(e) =>
            setTaskInput({ ...taskInput, description: e.target.value })
          }
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
          to={HOME_ROUTE}
          variant="contained"
          onClick={() => addTask(taskInput)}
          color="secondary"
        >
          Create Task
        </Button>
      </FormControl>
    </>
  );
};

export default TaskForm;
