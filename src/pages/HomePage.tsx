// MUI
import { Box, Typography, Fab, TextField } from "@mui/material";
// Icons
import AddIcon from "@mui/icons-material/Add";
// React Router
import { NavLink } from "react-router";
// Store
import useTaskStore from "../store/taskStore";
// Utils
import { ADD_TASK_ROUTE } from "../utils/fullRoutes";
import TasksList from "../components/TasksList";
import { useState } from "react";

const HomePage = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const [filter, setFilter] = useState("");

  return (
    <Box>
      {tasks.length === 0 ? (
        <Typography textAlign="center">
          You don't have any tasks to do.
        </Typography>
      ) : (
        <>
          <TextField
            variant="outlined"
            id="name-and-description-filter"
            label="Filter"
            aria-describedby="name-and-description-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <TasksList filter={filter.toLowerCase().trim()} />
        </>
      )}
      <NavLink to={ADD_TASK_ROUTE}>
        <Fab
          sx={{ position: "fixed", bottom: "30px", right: "30px" }}
          color="primary"
          aria-label="add-task"
        >
          <AddIcon />
        </Fab>
      </NavLink>
    </Box>
  );
};

export default HomePage;
