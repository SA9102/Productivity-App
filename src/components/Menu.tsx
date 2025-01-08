// MUI components
import { Menu as MUIMenu, MenuItem, IconButton } from "@mui/material";
// MUI icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
// Custom hooks
import useMenu from "../hooks/useMenu";
import menuItemType from "../types/menuItemType";

type props = {
  menuItems: menuItemType[];
};

// Renders an MUI IconButton and MUI Menu which opens when the button is
// pressed. The markup and logic for the MUI Menu is bundled in this component.
const Menu = ({ menuItems }: props) => {
  const { anchorEl, open, handleClick, handleClose } = useMenu();
  return (
    <>
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
      <MUIMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((menuItem: menuItemType) => (
          <MenuItem
            onClick={() => {
              menuItem.onClick();
              handleClose();
            }}
          >
            {menuItem.name}
          </MenuItem>
        ))}
      </MUIMenu>
    </>
  );
};

export default Menu;
