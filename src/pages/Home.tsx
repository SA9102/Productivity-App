// MUI
import { Box, Typography, Fab, Card, Stack } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

// Icons
import { NavLink } from "react-router";

// Store
import useTaskStore from "../store/taskStore";

import { ADD_TASK } from "../utils/paths";
import taskType from "../types/taskType";

const Home = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <Box>
      {tasks.length === 0 ? (
        <Typography textAlign="center">
          You don't have any tasks to do.
        </Typography>
      ) : (
        <Stack gap="0.5rem">
          {tasks.map((task) => (
            <Card variant="outlined" key={task.id}>
              {task.name}
            </Card>
          ))}{" "}
        </Stack>
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
