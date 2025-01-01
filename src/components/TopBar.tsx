import { AppBar, Toolbar, Typography } from "@mui/material";

type props = {
  title: string;
};

const TopBar = ({ title }: props) => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
