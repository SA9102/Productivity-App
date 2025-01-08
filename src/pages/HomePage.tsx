// MUI
import { Box, Typography, Fab } from "@mui/material";
// Icons
import AddIcon from "@mui/icons-material/Add";
// React Router
import { NavLink } from "react-router";
// Store
import useTaskStore from "../store/taskStore";
// Utils
import { ADD_TASK_ROUTE } from "../utils/fullRoutes";
import TasksList from "../components/TasksList";

const HomePage = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <Box>
      {tasks.length === 0 ? (
        <Typography textAlign="center">
          You don't have any tasks to do.
        </Typography>
      ) : (
        <TasksList />
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
