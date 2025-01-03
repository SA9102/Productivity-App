// MUI components
import {
  AppBar as MUIAppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { ReactNode, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useLocation } from "react-router";

// Custom hooks
import useMoreMenu from "../hooks/useMoreMenu";

type props = {
  title: string;
  children?: ReactNode;
};

const AppBarMenu = ({ title, children }: props) => {
  // Sets up the logic for using the Menu component from MUI
  const path = useLocation().pathname;
  const { anchorEl, open, handleClick, handleClose } = useMoreMenu();

  const getLastPath = () => {
    const pathSplit = path.split("/");
    const last = pathSplit[pathSplit.length - 1];
    console.log(last);
    return last;
  };
  // console.log(path);
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
            <IconButton
              id="more-button"
              aria-label="more"
              sx={{ position: "fixed", right: "0.5rem" }}
              aria-control={open ? "more" : undefined}
              aria-haspopup={true}
              aria-expanded={open ? true : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </MUIAppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "more-button" }}
      >
        {getLastPath() !== "add-task" && (
          <MenuItem
            onClick={() => {
              handleClose();
            }}
          >
            Add Task
          </MenuItem>
        )}

        <MenuItem onClick={handleClose}>Categories</MenuItem>
        <MenuItem onClick={handleClose}>Download</MenuItem>
      </Menu>
    </>
  );
};

export default AppBarMenu;
