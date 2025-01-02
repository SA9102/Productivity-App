// MUI
import { Box, Typography, Fab } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

// Icons
import { NavLink } from "react-router";

// Store
import useTaskStore from "../store/taskStore";

import { ADD_TASK } from "../utils/paths";

const Home = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <Box>
      {tasks.length === 0 ? (
        <Typography textAlign="center">
          You don't have any tasks to do.
        </Typography>
      ) : (
        tasks.map((task) => <p>{task.name}</p>)
      )}
      <NavLink to={ADD_TASK}>
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

export default Home;
