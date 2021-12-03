import { Card } from "components/Card";
import { useState } from "react";
import axios from "axios";
import { useStore } from "../../store";
import { useRouter } from "next/router";

export default function Login() {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  const router = useRouter();
  const setUser = useStore((state) => state.setUser);

  async function LoginHandle(e) {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const { data, status } = await axios.post(
        "http://localhost:8000/api/profile/login/",
        formData
      );
      //Fetch user doc if success
      if (!data || status != 200) return;
      const { data: userDocs } = await axios.get(
        "http://localhost:8000/api/profile/" + formData.email
      );
      const userDoc = userDocs[0];
      const userData = {
        token: data,
        ...userDoc,
      };
      console.log(userData);
      // Store user doc in state
      setUser(userData);

      // Redirect to profile page
      router.push("/profile");
    } catch (e) {
      console.error(e);
    }
  }

  async function RegisterHandle(e) {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const { status } = await axios.post(
      "http://localhost:8000/api/profile/register/",
      formData
    );
    console.log("Status of Register Request", status);
  }

  return (
    <div className="px-15 py-8 w-full">
      <div className="grid grid-cols-[1fr,50px,1fr] gap-x-5 mt-10">
        <div className="col-span-2 md:col-span-1">
          <h1 className="text-3xl font-bold text-center">Login</h1>

          <form onSubmit={LoginHandle} className="m-12 mx-auto max-w-375px">
            <Card>
              <h1 className="text-lg font-semibold mb-3">Email</h1>
              <input
                name="email"
                type="email"
                className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              ></input>
              <h1 className="text-lg font-semibold mb-3">Password</h1>
              <input
                type="password"
                name="password"
                className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              ></input>

              <div className="text-center">
                <button
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
          </form>
        </div>

        <div className="col-span-1">
          <h1 className="text-3xl text-gray-400 font-bold text-center">OR</h1>
          <div className="border-l-3 border-dark-300 rounded-lg h-500px w-0px mx-auto mt-10"></div>
        </div>

        <div className="col-span-2 md:col-span-1 ">
          <h1 className="text-3xl font-bold text-center">Register</h1>

          <form onSubmit={RegisterHandle} className="m-12 mx-auto max-w-375px">
            <Card>
              <h1 className="text-lg font-semibold mb-3">Username</h1>
              <input
                name="username"
                className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              ></input>
              <h1 className="text-lg font-semibold mb-3">Email</h1>
              <input
                type="email"
                name="email"
                className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              ></input>
              <h1 className="text-lg font-semibold mb-3">Password</h1>
              <input
                type="password"
                name="password"
                className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              ></input>

              <div className="text-center">
                <button className="py-2 px-10 m-2 mt-5 bg-dark-300 text-white font-semibold text-md rounded-lg">
                  Register
                </button>
              </div>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
