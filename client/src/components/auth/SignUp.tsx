import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signIn } from "../../lib/auth-client";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="justify-center  border p-6 border-white rounded-md  w-1/4 flex transition-all">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl text-bold text-center text-white mb-6">
          Wellcome!
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <Input className="text-white" placeholder="First_Name" />
            <Input className="text-white" placeholder="Last_Name" />
            <Input className="text-black" placeholder="Email" />
            <Input className="text-white" placeholder="Password" />
          </div>
          <Button className="cursor-pointer mt-4">Login</Button>
        </div>
        <Link to="/gust" className="w-full">
          <Button className="w-full">Continue As A Gust</Button>
        </Link>
        <p className="cursor-pointer hover:text-white">
          already have an account?
        </p>
        <div className="flex justify-between mt-1 gap-1">
          <div
            onClick={async () => {
              await signIn.social({
                provider: "github",
                callbackURL: "/editor",
              });
            }}
            className="flex cursor-pointer w-1/2 text-center border items-center text-white rounded-md px-2 whitespace-nowrap hover:border-black"
          >
            <img className="h-10 w-10 " src="./github.png" alt="" />
            <p>Continue With Github</p>
          </div>
          <div
            className="flex cursor-pointer border items-center text-white rounded-md px-2 hover:border-black"
            onClick={async () =>
              await signIn.social({
                provider: "google",
                callbackURL: "/editor",
              })
            }
          >
            <img className="h-8 w-8 " src="./google.png" alt="" />
            <p>Continue With Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}
