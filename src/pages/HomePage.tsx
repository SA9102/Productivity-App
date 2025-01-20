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
} from "@mui/material";
// Icons
import AddIcon from "@mui/icons-material/Add";
// React Router
import { NavLink } from "react-router";
// Store
import useTaskStore from "../store/taskStore";
// Utils
import { ADD_TASK_ROUTE } from "../utils/fullRoutes";
import TasksList from "../components/TasksList";
// Custom hooks
import useTaskFilterStorage from "../hooks/useTaskFilterStorage";

const HomePage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const [filter, setFilter] = useTaskFilterStorage();

  return (
    <Stack gap="1rem" maxWidth="900px">
      <Typography
        variant="h4"
        component="h1"
        alignSelf="center"
        textAlign="center"
      >
        My Tasks
      </Typography>
      {tasks.length === 0 ? (
        <Typography textAlign="center">
          You don't have any tasks to do.
        </Typography>
      ) : (
        <>
          {/* <TaskFilterControl /> */}
          {/* <TextField
            variant="outlined"
            id="name-and-description-filter"
            label="Filter"
            aria-describedby="name-and-description-filter"
            value={filter.text}
            onChange={(e) =>
              setFilter({
                ...filter,
                text: e.target.value,
              })
            }
          /> */}
          {/* <FormGroup>
            <FormControlLabel
              label="No priority"
              control={
                <Checkbox
                  checked={filter.priority.none}
                  onClick={() =>
                    setFilter({
                      ...filter,
                      priority: {
                        ...filter.priority,
                        none: !filter.priority.none,
                      },
                    })
                  }
                />
              }
            />
            <FormControlLabel
              label="Low"
              control={
                <Checkbox
                  checked={filter.priority.low}
                  onClick={() =>
                    setFilter({
                      ...filter,
                      priority: {
                        ...filter.priority,
                        low: !filter.priority.low,
                      },
                    })
                  }
                />
              }
            />
            <FormControlLabel
              label="Medium"
              control={
                <Checkbox
                  checked={filter.priority.medium}
                  onClick={() =>
                    setFilter({
                      ...filter,
                      priority: {
                        ...filter.priority,
                        medium: !filter.priority.medium,
                      },
                    })
                  }
                />
              }
            />
            <FormControlLabel
              label="High"
              control={
                <Checkbox
                  checked={filter.priority.high}
                  onClick={() =>
                    setFilter({
                      ...filter,
                      priority: {
                        ...filter.priority,
                        high: !filter.priority.high,
                      },
                    })
                  }
                />
              }
            />
          </FormGroup> */}
          <TasksList filter={filter} />
        </>
      )}
      <NavLink
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
      </NavLink>
    </Stack>
  );
};

export default HomePage;
