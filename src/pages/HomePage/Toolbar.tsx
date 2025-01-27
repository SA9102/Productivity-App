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
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import useTaskStore from "../../store/taskStore";
import tasksLayoutType from "../../types/tasksLayoutType";
import { grey } from "@mui/material/colors";
// MUI Icons
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import { useState } from "react";
import useFilterTasks from "../../hooks/useFilterTasks";
import taskFilterType from "../../types/tasksFilterType";
import defaultTasksFilters from "../../utils/defaultTasksFilters";

type props = {
  tasksLayout: tasksLayoutType;
  onChangeLayout: (e, newLayout: tasksLayoutType) => void;
};

const Toolbar = ({ tasksLayout, onChangeLayout }: props) => {
  const getTasksNumber = useTaskStore((state) => state.getTasksNumber);
  const getCompletedTasksNumber = useTaskStore(
    (state) => state.getCompletedTasksNumber
  );

  const [open, setOpen] = useState(false);

  const normalise = () => (getCompletedTasksNumber() * 100) / getTasksNumber();

  // const [filters, setFilters] = useState<taskFilterType>(defaultTasksFilters);

  // const tasksFiltered = useFilterTasks(filters);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        gap="1rem"
        // sx={{ backgroundColor: grey[900] }}
      >
        {/* <Typography>Layout</Typography> */}
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
        {/* </Box> */}
        {/* <TextField size="small" /> */}
        {/* <Button variant="outlined" onClick={() => setOpen(true)}>
          Filter Options
        </Button> */}
        {/* <LinearProgress variant="determinate" value={normalise()} /> */}
      </Stack>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Filter Options</DialogTitle>
        <DialogContent>
          <TextField size="small" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Toolbar;