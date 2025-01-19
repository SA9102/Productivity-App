/*** The area in the Home page where users can filter tasks ***/

// React
import { useState } from "react";

// MUI
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const TaskFilterControl = () => {
  const [filter, setFilter] = useState("");
  return (
    <>
      <TextField
        variant="outlined"
        id="name-and-description-filter"
        label="Filter"
        aria-describedby="name-and-description-filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <FormGroup>
        <FormControlLabel
          label="No priority"
          control={<Checkbox defaultChecked />}
        />
        <FormControlLabel label="Low" control={<Checkbox defaultChecked />} />
        <FormControlLabel
          label="Medium"
          control={<Checkbox defaultChecked />}
        />
        <FormControlLabel label="High" control={<Checkbox defaultChecked />} />
      </FormGroup>
    </>
  );
};

export default TaskFilterControl;
