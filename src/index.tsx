import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./styles/index.css";
import App from "./App.tsx";
import "./default.css";
import TaskForm from "./pages/TaskForm.tsx";

// External packages
import { BrowserRouter, Routes, Route } from "react-router";

// Util imports
import { home, addTask } from "./utils/paths";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={home} element={<App />} />
        <Route path={addTask} element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
