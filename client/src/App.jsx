import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddTask, Dashboard, EditTask, Login, Register, Tasks } from "./pages";

import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages//Register";
import { action as addTaskAction } from "./pages/AddTask";
import { action as deleteTaskAction } from "./pages/DeleteTask";
import { action as editTaskAction } from "./pages/EditTask";
import { loader as tasksLoader } from "./pages/Tasks";
import { loader as editTaskLoader } from "./pages/EditTask";
const router = createBrowserRouter([
  { path: "", element: <Login />, action: loginAction },
  { path: "/register", element: <Register />, action: registerAction },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Tasks />, loader: tasksLoader },
      { path: "add-task", element: <AddTask />, action: addTaskAction },
      {
        path: "edit-task/:id",
        element: <EditTask />,
        action: editTaskAction,
        loader: editTaskLoader,
      },
      { path: "delete-task/:id", action: deleteTaskAction },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}>App</RouterProvider>;
};

export default App;
