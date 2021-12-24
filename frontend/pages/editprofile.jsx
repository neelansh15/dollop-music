import axios from "axios";
import Card from "components/Card/Card";
import { useEffect, useState } from "react";
import { useStore } from "store";
import { useRouter } from "next/router";
import Head from "next/head";

export default function EditProfile() {
  const userState = useStore((state) => state.user);
  const apiUrl = useStore((state) => state.apiUrl);
  const router = useRouter();
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
    bannerImage: "",
    image: "",
    username: "",
    name: "",
    tagline: "",
    about: "",
    instagram: "",
    soundcloud: "",
    twitter: "",
    github: "",
    _id: "", // email
    password: "",
    confPassword: "",
  });

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    let { data: fetchedData } = await axios({
      url: "http://localhost:8000/api/profile/" + userState._id,
    });

    console.log(fetchedData);
    setUserDetails({ ...fetchedData });
  }

  function handleInput(e) {
    // console.log(e.target.name);
    // console.log(e.target.value);

    let field = e.target.name;
    let value = e.target.value;

    setUserDetails({ ...userDetails, [field]: value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("start");
    console.log(e);
    const formData = new FormData();
    formData.append("uploadedFile", e.target[0].files[0]);
    formData.append("username", e.target[1].value);
    formData.append("tagline", e.target[2].value);
    formData.append("about", e.target[3].value);
    formData.append("instagram", e.target[4].value);
    formData.append("soundcloud", e.target[5].value);
    formData.append("twitter", e.target[5].value);
    formData.append("github", e.target[5].value);
    formData.append("id", userState._id);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const { data: returnDoc } = await axios.post(
      `${apiUrl}/api/profile/update`,
      formData,
      config
    );
    console.log("end", returnDoc);
    router.push("/profile");
  };
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <div className="px-15 pt-10 w-full">
      <Head>
        <title>Edit Profile - Dollop Music</title>
      </Head>
      <h1 className="text-3xl font-bold text-center">Edit Profile</h1>

      <div className="max-w-700px mx-auto mt-10">
        <Card>
          <form onSubmit={handleFormSubmit}>
            <h1 className="text-lg font-semibold mb-5">Avatar</h1>
            <img
              className="object-cover w-3/5 h-3/5 max-w-300px max-h-300px rounded-full mx-auto mb-5"
              src={userDetails.image}
            ></img>
            <div className="my-4">
              <label htmlFor="uploadedFile" className="text-lg font-semibold">
                Update avatar
              </label>{" "}
              <br />
              <input
                type="file"
                name="uploadedFile"
                id="uploadedFile"
                accept="image/*"
              />
            </div>

            <h1 className="text-lg font-semibold mb-3">Username</h1>
            <input
              name="username"
              type="username"
              value={userDetails.username}
              onChange={handleInput}
              className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              id="username"
            ></input>

            <h1 className="text-lg font-semibold mb-3">Tag Line</h1>
            <input
              name="tagline"
              type="tagline"
              value={userDetails.tagline}
              onChange={handleInput}
              className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              id="tagline"
            ></input>

            <h1 className="text-lg font-semibold mb-3">About</h1>
            <textarea
              rows={5}
              name="about"
              type="about"
              value={userDetails.about}
              onChange={handleInput}
              className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              id="about"
            ></textarea>

            <h1 className="text-lg font-semibold mb-3">Instagram Profile</h1>
            <input
              name="instagram"
              type="instagram"
              value={userDetails.instagram}
              onChange={handleInput}
              className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              id="instagram"
            ></input>

            <h1 className="text-lg font-semibold mb-3">SoundCloud Profile</h1>
            <input
              name="soundcloud"
              type="soundcloud"
              value={userDetails.soundcloud}
              onChange={handleInput}
              className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              id="soundcloud"
            ></input>

            <h1 className="text-lg font-semibold mb-3">Twitter Profile</h1>
            <input
              name="twitter"
              type="twitter"
              value={userDetails.twitter}
              onChange={handleInput}
              className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              id="twitter"
            ></input>

            <h1 className="text-lg font-semibold mb-3">GitHub Profile</h1>
            <input
              name="github"
              type="github"
              value={userDetails.github}
              onChange={handleInput}
              className="bg-dark-300 p-2 mb-3 w-full rounded-lg"
              id="github"
            ></input>

            {/* Question: Do we let them change email? */}
            {/* <h1 className='text-lg font-semibold mb-3'>Email</h1>
            <input
              name='_id'
              type='email'
              value={userDetails._id}
              onChange={handleInput}
              className='bg-dark-300 p-2 mb-3 w-full rounded-lg'
              id='id'
            ></input> */}

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
                type="submit"
                className={
                  "py-2 px-10 m-2 my-3 text-white bg-dark-300 font-semibold text-md rounded-lg " +
                  (hovered ? "" : "bg-dark-100")
                }
              >
                Save
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
