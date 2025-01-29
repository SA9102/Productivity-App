import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Fab,
  Stack,
  Typography,
  AppBar,
  IconButton,
  Button,
  useColorScheme,
  createTheme,
} from "@mui/material";
// MUI icons
import LightModeIcon from "@mui/icons-material/LightMode";
// Utils
import {
  HOME_ROUTE,
  ADD_TASK_ROUTE,
  EDIT_TASK_ROUTE,
  MANAGE_CATEGORIES_ROUTE,
} from "./utils/fullRoutes";

// Custom components
// import AppBar from "./components/AppBar";
import AppBarWithArrow from "./components/AppBarWithArrow";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import TaskEntryPage from "./pages/TaskEntryPage";

// React Router
import { Routes, Route, useLocation } from "react-router";
import { useState } from "react";
import ManageCategoriesPage from "./pages/ManageCategoriesPage";

const App = () => {
  const path = useLocation().pathname;
  const { mode, setMode } = useColorScheme();
  // const [mode, setMode] = useState("dark");

  // const toggleTheme = () => {
  //   setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  // };

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
      <Stack direction="row">
        <IconButton onClick={() => setMode("dark")}>
          <LightModeIcon />
        </IconButton>
      </Stack>
      <Box sx={{ margin: "0.5rem 1rem" }}>
        <Routes>
          <Route path={HOME_ROUTE} element={<HomePage />} />
          <Route path={ADD_TASK_ROUTE} element={<TaskEntryPage />} />
          <Route
            path={EDIT_TASK_ROUTE + "/:taskId"}
            element={<TaskEntryPage />}
          />
          <Route
            path={MANAGE_CATEGORIES_ROUTE}
            element={<ManageCategoriesPage />}
          />
        </Routes>
      </Box>
    </Stack>
  );
};

export default App;
