import { Link } from "react-router";
import { Button } from "./ui/button";

export default function Starter() {
  return (
    <div className="w-full h-screen bg-[#077A7D] flex justify-center items-center">
      <div className="flex justify-between w-2/4 items-center">
        <img
          className="animate-bounce animation-bounce-slower"
          src="/image.png"
          alt=""
        />

        <div className="flex flex-col text-3xl text-white gap-2">
          <h1 className="text-4xl mb-4">Wellcome!</h1>
          <Button className="w-50 text-xl cursor-pointer text-[#077A7D]">
            Login
          </Button>
          <Button className="w-50 text-xl cursor-pointer text-[#077A7D]">
            Signup
          </Button>
          <Link to="/gust">
            <Button className="w-50 text-xl cursor-pointer text-[#077A7D]">
              Try as a gust
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
