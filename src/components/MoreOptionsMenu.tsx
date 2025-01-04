import useMenu from "../hooks/useMenu";

import { useNavigate, useLocation } from "react-router";

import { Menu, MenuItem } from "@mui/material";

const MoreOptionsMenu = () => {
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const { anchorEl, open, handleClick, handleClose } = useMenu();

  const getLastPath = () => {
    const pathSplit = path.split("/");
    const last = pathSplit[pathSplit.length - 1];
    console.log(last);
    return last;
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{ "aria-labelledby": "more-button" }}
    >
      {getLastPath() !== "add-task" && (
        <MenuItem
          onClick={() => {
            navigate("/Todo-App/add-task");
            // handleClose();
          }}
        >
          Add Task
        </MenuItem>
      )}

      <MenuItem onClick={handleClose}>Categories</MenuItem>
      <MenuItem onClick={handleClose}>Download</MenuItem>
    </Menu>
  );
};

export default MoreOptionsMenu;
