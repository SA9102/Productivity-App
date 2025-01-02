import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./styles/index.css";
import App from "./App.tsx";
import "./default.css";
import TaskForm from "./pages/TaskForm.tsx";

// External packages
import { BrowserRouter, Routes, Route, Router } from "react-router";

// Util imports
import { home, addTask } from "./utils/paths";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import AppBar from "./components/AppBarWithArrow.tsx";

const theme = createTheme({
  typography: {
    fontFamily: "PT Sans",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
