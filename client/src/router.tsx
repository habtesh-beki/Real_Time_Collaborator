import { createBrowserRouter } from "react-router";
import Starter from "./components/Starter";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import GustPage from "./components/GustPage";
// import EditorPage from "./codeEditor/EditorPage";
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
