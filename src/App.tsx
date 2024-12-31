import { Fab, Typography } from "@mui/material";
// MUI icons
import AddIcon from "@mui/icons-material/Add";
import { NavLink } from "react-router";

import { addTask } from "./utils/paths";

import useTaskStore from "./store/taskStore";

const App = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <>
      <Typography variant="h3" component="h1">
        Welcome!
      </Typography>
      {tasks.length === 0 ? (
        <Typography>You don't have any tasks to do.</Typography>
      ) : (
        tasks.map((task) => <p>{task.name}</p>)
      )}
      <NavLink to={addTask}>
        <Fab
          sx={{ position: "fixed", bottom: "30px", right: "30px" }}
          color="primary"
          aria-label="add-task"
        >
          <AddIcon />
        </Fab>
      </NavLink>
    </>
  );
};

export default App;
