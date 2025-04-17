import { Link } from "react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function GustPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#077A7D]">
      <div className="flex flex-col gap-3 w-1/5">
        <div className="flex flex-col gap-2">
          <Label className="text-2xl text-white">Room Id</Label>
          <Input type="text" placeholder="roomId" />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-2xl text-white">username</Label>
          <Input type="text" placeholder="username" />
        </div>
        <div className="flex justify-between gap-1 mt-4">
          <Link to="/" className="w-1/2">
            <Button className="w-full">Back</Button>
          </Link>
          <Link to="/editor" className="w-1/2">
            <Button className="w-full">Start</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
