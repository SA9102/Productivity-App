import { Box, Fab, Stack, Typography } from "@mui/material";
// MUI icons

// Utils
import { PATH_FRONT, HOME, ADD_TASK } from "./utils/paths";

// Custom components
import AppBar from "./components/AppBar";
import AppBarWithArrow from "./components/AppBarWithArrow";

// Pages
import Home from "./pages/Home";
import TaskForm from "./pages/TaskForm";

// React Router
import { Routes, Route, useLocation } from "react-router";

const App = () => {
  const path = useLocation().pathname;

  // Gets the last path segment of the path, capitalises each word, and replaces
  // the hyphens with a space. This is used for the title in the AppBar component.
  const getTitle = () => {
    const titleWordsLower = path.split("/")[2].split("-");
    const titleWordsCapitalised = titleWordsLower.map((word) => {
      let firstLetter = word.slice(0, 1);
      const restOfWord = word.slice(1, word.length);
      firstLetter = firstLetter.toUpperCase();
      return firstLetter + restOfWord;
    });

    return titleWordsCapitalised.join(" ");
  };

  return (
    <Stack>
      {path === "/Todo-App" ? (
        <AppBar title="Home" />
      ) : (
        <AppBarWithArrow title={getTitle()} path={HOME} />
      )}
      <Box sx={{ margin: "2rem" }}>
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path={ADD_TASK} element={<TaskForm />} />
        </Routes>
      </Box>
    </Stack>
  );
};

export default App;
