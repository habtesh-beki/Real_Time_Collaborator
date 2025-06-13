import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import { socket } from "../App";

export default function JoinRoom() {
  const [roomID, setRoomId] = useState("");
  const [username, setUserName] = useState("");

  const handleRoomId = (event: any) => {
    setRoomId(event.target?.value);
  };

  const handleUserName = (event: any) => {
    setUserName(event.target.value);
  };

  const handleSubmit = () => {
    if (!roomID || !username) {
      console.log("Please insert username and room ID");
      return;
    }
    socket.emit(
      "join-room",
      { roomID, username, unkownUser: false },
      (error: any) => {
        if (error) {
          console.error("Join error:", error);
        } else {
          console.log("Joined room:", roomID, username);
        }
      }
    );
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#077A7D]">
      <div className="flex flex-col gap-3 w-1/5">
        <div className="flex flex-col gap-2">
          <Label className="text-2xl text-white">Room Id</Label>
          <Input
            type="text"
            placeholder="roomId"
            value={roomID}
            onChange={handleRoomId}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-2xl text-white">username</Label>
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={handleUserName}
          />
        </div>
        <div className="flex justify-between gap-1 mt-4">
          <Link to="/" className="w-1/2">
            <Button className="w-full">Back</Button>
          </Link>
          <Link to="/editor" className="w-1/2">
            <Button className="w-full" onClick={handleSubmit}>
              Start
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
