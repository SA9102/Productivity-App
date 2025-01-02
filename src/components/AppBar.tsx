import {
  AppBar as MUIAppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";

type props = {
  title: string;
  children?: ReactNode;
};

const AppBarMenu = ({ title, children }: props) => {
  return (
    <MUIAppBar position="static">
      <Toolbar>
        <IconButton aria-label="back">
          <MenuIcon />
        </IconButton>
        {children}
        <Typography variant="h6" component="div" textAlign="center">
          {title}
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBarMenu;
