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
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
// React Router
import { NavLink } from "react-router";
// Store
import useTaskStore from "../store/taskStore";
// Utils
import { ADD_TASK_ROUTE } from "../utils/fullRoutes";
import TasksList from "../components/TasksList";
// Custom hooks
import useTaskFilterStorage from "../hooks/useTaskFilterStorage";
import { useState } from "react";

import tasksViewType from "../types/tasksViewType";

const HomePage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const sortTasks = useTaskStore((state) => state.sortTasks);
  const [filter, setFilter] = useTaskFilterStorage();
  const [sortCriterion, setSortCriterion] = useState<"name" | "priority">(
    "priority"
  );
  const [tasksView, setTasksView] = useState<tasksViewType>("list");

  const handleChangeView = (e, newView: tasksViewType) => {
    if (newView !== null) {
      setTasksView(newView);
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
          {/* <FormControl fullWidth>
            <Typography>Sort by</Typography>
            <InputLabel>AA</InputLabel>
            <Select
              variant="standard"
              value={sortCriterion}
              onChange={() => setSortCriterion("name")}
              label="Sort By"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
            </Select>
          </FormControl> */}
          <Stack
            direction="row"
            gap="1rem"
            alignItems="center"
            // width="500px"
          >
            <FormControl>
              <Stack direction="row" alignItems="center" gap="1rem">
                <Typography>Sort by</Typography>
                <Select
                  variant="standard"
                  value={sortCriterion}
                  onChange={(e) => {
                    setSortCriterion(e.target.value);
                  }}
                  label="Sort By"
                >
                  <MenuItem value="name">name</MenuItem>
                  <MenuItem value="priority">priority</MenuItem>
                </Select>
              </Stack>
              <Stack direction="row" alignItems="center" gap="1rem">
                <Typography>Ascending</Typography>
                <Select variant="standard">
                  <MenuItem>True</MenuItem>
                  <MenuItem>False</MenuItem>
                </Select>
              </Stack>
              <Button
                onClick={() => {
                  sortTasks(sortCriterion);
                  // setFilter("a");
                }}
              >
                Go
              </Button>
            </FormControl>
          </Stack>
          <ToggleButtonGroup
            value={tasksView}
            onChange={handleChangeView}
            exclusive
          >
            <ToggleButton value="list">
              <ListIcon />
            </ToggleButton>
            <ToggleButton value="grid">
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <LinearProgress variant="determinate" />
          <TasksList filter={filter} view={tasksView} />
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
