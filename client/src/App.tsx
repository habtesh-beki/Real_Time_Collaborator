import { io } from "socket.io-client";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("connect with server");
    });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
