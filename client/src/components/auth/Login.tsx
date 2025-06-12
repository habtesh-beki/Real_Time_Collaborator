import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { signUp, signIn } from "../../lib/auth-client";

export default function Login() {
  return (
    <div className="justify-center  border p-6 border-white rounded-md  w-1/4 flex transition-all">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl text-bold text-center text-white mb-6">
          Wellcome back!
        </h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <Input className="text-black" placeholder="email" />
            <Input className="text-white" placeholder="password" />
          </div>
          <Button className="cursor-pointer mt-4">Login</Button>
        </div>
        <Button>Continue As A Gust</Button>
        <p className="cursor-pointer hover:text-white">
          Don’t have an account?
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
