import { Dialog as MUIDialog } from "@mui/material";
import { useState } from "react";

const Dialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <MUIDialog
      onClose={() => setOpen(false)}
      open={open}
      aria-labelledby="task-deletion"
      aria-describedby="deleting-task"
    >
      <p>Hello</p>
    </MUIDialog>
  );
};

export default Dialog;
