import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.tsx";
import AddTask from "./components/AddTask.tsx";
import DeleteTask from "./components/DeleteTask.tsx";
import About from "./components/About.tsx";
import Contact from "./components/Contact.tsx";
import ShowTasks from "./components/ShowTasks.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import Login from "./components/Login.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/add",
    element: <AddTask />,
  },
  {
    path: "/delete",
    element: <DeleteTask />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/tasks",
    element: <ShowTasks />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
