import { createBrowserRouter } from "react-router";
import Starter from "./components/Starter";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import GustPage from "./components/auth/GustPage";
import Layout from "./pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Starter />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/gust",
    element: <GustPage />,
  },
  {
    path: "/editor",
    element: <Layout />,
  },
]);
