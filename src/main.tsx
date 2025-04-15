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
import Register from "./components/Register.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/add",
    element: (
      <ProtectedRoute>
        <AddTask />
      </ProtectedRoute>
    ),
  },
  {
    path: "/delete",
    element: (
      <ProtectedRoute>
        <DeleteTask />
      </ProtectedRoute>
    ),
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
    element: (
      <ProtectedRoute>
        <ShowTasks />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
