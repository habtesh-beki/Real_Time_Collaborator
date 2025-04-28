import { io } from "socket.io-client";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";

export const socket = io("http://localhost:3000");
export function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect with server");
    });
  }, []);
  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </>
  );
}

// export  App;
