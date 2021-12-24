import axios from "axios";
import Card from "components/Card/Card";
import { useEffect, useState } from "react";

export default function EditProfile() {
  // let [email, setEmail] = useState()
  // let [username, setUsername] = useState()
  // let [tagline, setTagline] = useState()
  // let [about, setAbout] = useState()
  // let [instagram, setInstagram] = useState()
  // let [soundcloud, setSoundcloud] = useState()
  // let [twitter, setTwitter] = useState()
  // let [github, setGithub] = useState()
  // let [password, setPassword] = useState()
  // let [confPassword, setConfPassword] = useState()

  let [userDetails, setUserDetails] = useState({
    bannerImage: '',
    image: '',
    username: '',
    name: '',
    tagline: '',
    about: '',
    instagram: '',
    soundcloud: '',
    twitter: '',
    github: '',
    _id: '',         // email
    password: '',
    confPassword: '',
  })

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    let userID = "fridge@xbox.com"

    let {data: fetchedData} = await axios({
      url: "http://localhost:8000/api/profile/" + userID,
    });

    console.log(fetchedData);
    setUserDetails({...fetchedData});
  }

  function handleInput(e) {
    // console.log(e.target.name);
    // console.log(e.target.value);

    let field = e.target.name;
    let value = e.target.value;

    setUserDetails({...userDetails, [field]: value})
  }

  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <div className="px-15 pt-10 w-full">
      <h1 className="text-3xl font-bold text-center">Edit Profile</h1>

      <div className="max-w-700px mx-auto mt-10">
        <Card>
          <h1 className="text-lg font-semibold mb-5">Avatar</h1>
          <img 
            className="object-cover w-3/5 h-3/5 max-w-300px max-h-300px rounded-full mx-auto mb-5"
            src={userDetails.image}
          ></img>

          <h1 className="text-lg font-semibold mb-3">Username</h1>
          <input
            name="username"
            type="username"
            value={userDetails.username}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          <h1 className="text-lg font-semibold mb-3">Tag Line</h1>
          <input
            name="tagline"
            type="tagline"
            value={userDetails.tagline}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          <h1 className="text-lg font-semibold mb-3">About</h1>
          <textarea
            rows={5}
            name="about"
            type="about"
            value={userDetails.about}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></textarea>

          <h1 className="text-lg font-semibold mb-3">Instagram Profile</h1>
          <input
            name="instagram"
            type="instagram"
            value={userDetails.instagram}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          <h1 className="text-lg font-semibold mb-3">SoundCloud Profile</h1>
          <input
            name="soundcloud"
            type="soundcloud"
            value={userDetails.soundcloud}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          <h1 className="text-lg font-semibold mb-3">Twitter Profile</h1>
          <input
            name="twitter"
            type="twitter"
            value={userDetails.twitter}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          <h1 className="text-lg font-semibold mb-3">GitHub Profile</h1>
          <input
            name="github"
            type="github"
            value={userDetails.github}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          {/* Question: Do we let them change email? */}
          <h1 className="text-lg font-semibold mb-3">Email</h1>
          <input
            name="_id"
            type="email"
            value={userDetails._id}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          {/* <h1 className="text-lg font-semibold mb-3">Password</h1>
          <input
            name="password"
            type="password"
            value={userDetails.password}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input>

          <h1 className="text-lg font-semibold mb-3">Confirm Password</h1>
          <input
            name="confPassword"
            type="confPassword"
            value={userDetails.confPassword}
            onChange={handleInput}
            className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
          ></input> */}

          <div className="text-center">
            <button
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
              className={
                "py-2 px-10 m-2 my-3 text-white bg-dark-300 font-semibold text-md rounded-lg " +
                (hovered ? "" : "bg-dark-100")
              }
            >
              Edit
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}