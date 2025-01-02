import {
  AppBar as MUIAppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { ReactNode } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

type props = {
  title: string;
  children?: ReactNode;
};

const AppBarMenu = ({ title, children }: props) => {
  return (
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
            aria-label="back"
            sx={{ position: "fixed", right: "0.5rem" }}
          >
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
};

export default AppBarMenu;
