import { Box, Fab, Stack, Typography } from "@mui/material";
// MUI icons

// Utils
import {
  HOME_ROUTE,
  ADD_TASK_ROUTE,
  EDIT_TASK_ROUTE,
} from "./utils/fullRoutes";

// Custom components
import AppBar from "./components/AppBar";
import AppBarWithArrow from "./components/AppBarWithArrow";

// Pages
import HomePage from "./pages/HomePage";
import TaskEntryPage from "./pages/TaskEntryPage";

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
        <AppBarWithArrow title={getTitle()} path={HOME_ROUTE} />
      )}
      <Box sx={{ margin: "2rem" }}>
        <Routes>
          <Route path={HOME_ROUTE} element={<HomePage />} />
          <Route path={ADD_TASK_ROUTE} element={<TaskEntryPage />} />
          <Route
            path={EDIT_TASK_ROUTE + "/:taskId"}
            element={<TaskEntryPage />}
          />
        </Routes>
      </Box>
    </Stack>
  );
};

export default App;
