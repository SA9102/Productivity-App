// MUI components
import { Card, Typography } from "@mui/material";
// Store
import useTaskStore from "../store/taskStore";
// Types
import taskType from "../types/taskType";
// React Routet
import { useNavigate } from "react-router";
// Utils
import { EDIT_TASK_ROUTE } from "../utils/fullRoutes";
// Other external packages
import { useLongPress } from "use-long-press";

type props = {
  task: taskType;
};

// Renders a 'task item' to the screen
const TaskItem = ({ task }: props) => {
  const toggleComplete = useTaskStore((state) => state.toggleComplete);
  const navigate = useNavigate();
  const bind = useLongPress((taskId) => {
    console.log("USE LONG PRESS");
    console.log(taskId);
    navigate(`${EDIT_TASK_ROUTE}/${taskId}`);
  });

  return (
    <Card
      variant="outlined"
      key={task.id}
      onClick={() => toggleComplete(task.id)}
      {...bind(task.id)}
    >
      {task.isComplete ? (
        <Typography sx={{ textDecoration: "line-through" }}>
          {task.name}
        </Typography>
      ) : (
        <Typography>{task.name}</Typography>
      )}
      <p>hello</p>
    </Card>
  );
};

export default TaskItem;
