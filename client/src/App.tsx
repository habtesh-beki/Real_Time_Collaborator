import { io } from "socket.io-client";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connect", () => {
      console.log("connect with server");
    });
  }, []);
  return <div className="text-black">Hi There</div>;
}

export default App;
