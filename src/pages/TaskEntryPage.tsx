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
import getEmptyTask from "../utils/functions/getEmptyTask";
import { HOME_ROUTE } from "../utils/fullRoutes";

// Store imports
import useTaskStore from "../store/taskStore";
import getLastRouteSegment from "../utils/functions/getLastRouteSegment";
import useCategoryStore from "../store/categoryStore";

// This page renders the input fields for a task.
// This is used either when adding a new task, or when editing a task that exists.
// The optional prop 'task' is an object of type 'taskType'. If a task is passed in,
// it will render a page to edit a task. But if 'task' is null, it will render a page
// to create a new task.
const TaskForm = () => {
  const route = useLocation().pathname;
  const [taskInput, setTaskInput] = useState<taskType>(getEmptyTask());
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const navigate = useNavigate();
  const [priority, setPriority] = useState<1 | 2 | 3>(1);

  const [isAddingTask, setIsAddingTask] = useState(true);

  const categories = useCategoryStore((state) => state.categories);

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
      setIsAddingTask(false);
      const tasks = useTaskStore.getState().tasks;
      const task = tasks.find((task) => task.id === lastRouteSegment);
      setTaskInput(task!);
    }
  }, []);

  console.log(taskInput.category);

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center" mb={3}>
        {getLastRouteSegment(route) === "add-task" ? "Add Task" : "Edit Task"}
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
        <TextField
          select
          label="Category"
          defaultValue="None"
          value={taskInput.category}
          onChange={(e) =>
            setTaskInput({ ...taskInput, category: e.target.value })
          }
        >
          <MenuItem value="">None</MenuItem>
          {categories.map((category) => (
            <MenuItem value={category.id}>{category.name}</MenuItem>
          ))}
        </TextField>
        <Typography>Priority</Typography>
        <ButtonGroup variant="contained" fullWidth>
          <Button
            onClick={() => setTaskInput({ ...taskInput, priority: "none" })}
            color={taskInput.priority === "none" ? "secondary" : "primary"}
          >
            None
          </Button>
          <Button
            onClick={() => setTaskInput({ ...taskInput, priority: "low" })}
            color={taskInput.priority === "low" ? "secondary" : "primary"}
          >
            Low
          </Button>
          <Button
            onClick={() => setTaskInput({ ...taskInput, priority: "medium" })}
            color={taskInput.priority === "medium" ? "secondary" : "primary"}
          >
            Medium
          </Button>
          <Button
            onClick={() => setTaskInput({ ...taskInput, priority: "high" })}
            color={taskInput.priority === "high" ? "secondary" : "primary"}
          >
            High
          </Button>
        </ButtonGroup>
        {isAddingTask ? (
          <Button
            component={Link}
            to={HOME_ROUTE}
            variant="contained"
            onClick={() => addTask(taskInput)}
            color="secondary"
          >
            Create Task
          </Button>
        ) : (
          <Button
            component={Link}
            to={HOME_ROUTE}
            variant="contained"
            onClick={() => updateTask(taskInput)}
            color="secondary"
          >
            Update Task
          </Button>
        )}
        <Button component={Link} to={HOME_ROUTE}>
          Cancel
        </Button>
      </FormControl>
    </>
  );
};

export default TaskForm;
