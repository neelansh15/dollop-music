import { Card } from "components/Card";
import { useState } from "react";

// let [isLoginHovered, setLoginHovered] = useState()

function LoginHandle() {
  console.log("Login Button Pressed");
}

function RegisterHandle() {
  console.log("Register Button Pressed");
}

export default function Login() {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <div className="px-15 py-8 w-full">
      <div className="grid grid-cols-[1fr,50px,1fr] gap-x-5 mt-10">
        <div className="col-span-2 md:col-span-1">
          <h1 className="text-3xl font-bold text-center">Login</h1>

          <div className="m-12 mx-auto max-w-375px">
            <Card>
              <h1 className="text-lg font-semibold mb-3">Username</h1>
              <input className="bg-dark-300 p-2 mb-3 w-full rounded-lg"></input>
              <h1 className="text-lg font-semibold mb-3">Password</h1>
              <input className="bg-dark-300 p-2 mb-3 w-full rounded-lg"></input>

              <div className="text-center">
                <button
                  onClick={LoginHandle}
                  onMouseEnter={toggleHover}
                  onMouseLeave={toggleHover}
                  className={
                    "py-2 px-10 m-2 my-3 text-white bg-dark-300 font-semibold text-md rounded-lg" +
                    (hovered ? "" : "bg-dark-100")
                  }
                >
                  Login
                </button>
              </div>
            </Card>
          </div>
        </div>

        <div className="col-span-1">
          <h1 className="text-3xl text-gray-400 font-bold text-center">OR</h1>
          <div className="border-l-3 border-dark-300 rounded-lg h-500px w-0px mx-auto mt-10"></div>
        </div>

        <div className="col-span-2 md:col-span-1 ">
          <h1 className="text-3xl font-bold text-center">Register</h1>

          <div className="m-12 mx-auto max-w-375px">
            <Card>
              <h1 className="text-lg font-semibold mb-3">Username</h1>
              <input className="bg-dark-300 p-2 mb-3 w-full rounded-lg"></input>
              <h1 className="text-lg font-semibold mb-3">Email</h1>
              <input className="bg-dark-300 p-2 mb-3 w-full rounded-lg"></input>
              <h1 className="text-lg font-semibold mb-3">Password</h1>
              <input className="bg-dark-300 p-2 mb-3 w-full rounded-lg"></input>

              <div className="text-center">
                <button
                  onClick={RegisterHandle}
                  className="py-2 px-10 m-2 mt-5 bg-dark-300 text-white font-semibold text-md rounded-lg"
                >
                  Register
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
