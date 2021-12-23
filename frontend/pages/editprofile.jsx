import axios from "axios";
import Card from "components/Card/Card";
import { useState } from "react";

export default function EditProfile() {
  let [email, setEmail] = useState()
  let [username, setUsername] = useState()
  let [password, setPassword] = useState()
  let [confPassword, setConfPassword] = useState()

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function handleConfPassword(e) {
    setConfPassword(e.target.value)
  }

  return (
    <div className="px-15 pt-10 w-full">
      <h1 className="text-3xl font-bold text-center">Edit Profile</h1>

      <div className="w-400px mx-auto mt-10">
        <Card>
          <h1 className="text-lg font-semibold mb-5">Avatar</h1>
          <img 
          className="object-cover w-250px h-250px rounded-full mx-auto mb-5"
          src="https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg"
          ></img>

          <h1 className="text-lg font-semibold mb-3">Email</h1>
          <input
            name="email"
            type="email"
            value={email}
            onChange={handleEmail}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          <h1 className="text-lg font-semibold mb-3">Username</h1>
          <input
            name="username"
            type="username"
            value={username}
            onChange={handleUsername}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          <h1 className="text-lg font-semibold mb-3">Password</h1>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePassword}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          <h1 className="text-lg font-semibold mb-3">Confirm Password</h1>
          <input
            name="confPassword"
            type="confPassword"
            value={confPassword}
            onChange={handleConfPassword}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>
        </Card>
      </div>
    </div>
  );
}