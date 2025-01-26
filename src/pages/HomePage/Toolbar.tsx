// A component within HomePage that provides options for filtering,
// sorting and changing the layout of tasks.

import {
  Stack,
  Button,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
} from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import useTaskStore from "../../store/taskStore";
import tasksLayoutType from "../../types/tasksLayoutType";

type props = {
  tasksLayout: tasksLayoutType;
  onChangeLayout: (e, newLayout: tasksLayoutType) => void;
};

const Toolbar = ({ tasksLayout, onChangeLayout }: props) => {
  const getTasksNumber = useTaskStore((state) => state.getTasksNumber);
  const getCompletedTasksNumber = useTaskStore(
    (state) => state.getCompletedTasksNumber
  );

  const normalise = () => (getCompletedTasksNumber() * 100) / getTasksNumber();

  return (
    <>
      <Stack>
        <Button>New Task</Button>
        <Box>
          <Typography>Layout</Typography>
          <ToggleButtonGroup
            value={tasksLayout}
            onChange={onChangeLayout}
            exclusive
            size="small"
          >
            <ToggleButton value="list">
              <ListIcon />
            </ToggleButton>
            <ToggleButton value="grid">
              <GridViewIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Stack>

      <LinearProgress variant="determinate" value={normalise()} />
    </>
  );
};

export default Toolbar;
