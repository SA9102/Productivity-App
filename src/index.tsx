import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

// External packages
import { BrowserRouter, MemoryRouter } from "react-router";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import TaskForm from "./pages/TaskEntryPage.tsx";
import { grey } from "@mui/material/colors";

// const theme = createTheme({
//   colorSchemes: {
//     dark: true,
//   },
// });

const darkTheme = createTheme({
  typography: {
    fontFamily: "Lexend",
  },
  palette: {
    mode: "dark",
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          padding: "0.5rem",
        }),
      },
    },
  },
});

// const theme = createTheme({
//   typography: {
//     fontFamily: "PT Sans",
//   },
//   shape: {
//     borderRadius: 10,
//   },
//   // shadows: ["none"],
//   palette: {
//     primary: {
//       main: "#4DB6AC",
//       light: "#B2DFDB",
//       dark: "#009688",
//     },
//     secondary: {
//       main: "#F4511E",
//     },
//   },
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
        {/* <TaskForm /> */}
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
