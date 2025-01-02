import AppBarMenu from "./AppBar";

import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router";

type props = {
  title: string;
  path: string;
};

const AppBar = ({ title, path }: props) => {
  return (
    <AppBarMenu title={title}>
      <IconButton aria-label="back" component={Link} to={path}>
        <ArrowBackIcon />
      </IconButton>
    </AppBarMenu>
  );
};

export default AppBar;
