// MUI components
import { AppBar as MUIAppBar, Toolbar, Typography, Box } from "@mui/material";
import { ReactNode, useMemo } from "react";

import { useNavigate } from "react-router";

import useTaskStore from "../store/taskStore";
import { ADD_TASK_ROUTE } from "../utils/fullRoutes";

import Menu from "./Menu";

type props = {
  title: string;
  children?: ReactNode;
};

const AppBarMenu = ({ title, children }: props) => {
  // Sets up the logic for using the Menu component from MUI

  const removeCompletedTasks = useTaskStore(
    (state) => state.removeCompletedTasks
  );

  const navigate = useNavigate();

  const menuItems = useMemo(
    () => [
      { name: "Add Task", onClick: () => navigate(ADD_TASK_ROUTE) },
      { name: "Categories", onClick: () => {} },
      { name: "Download", onClick: () => {} },
      { name: "Remove Completed", onClick: () => removeCompletedTasks() },
    ],
    [navigate]
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <MUIAppBar position="static" sx={{ boxShadow: "none" }}>
          <Toolbar sx={{ width: "100vw" }}>
            {children}
            <Typography
              variant="h6"
              component="div"
              textAlign="center"
              fontWeight="900"
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <Menu menuItems={menuItems} />
          </Toolbar>
        </MUIAppBar>
      </Box>
    </>
  );
};

export default AppBarMenu;
