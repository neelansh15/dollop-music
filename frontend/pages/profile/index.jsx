import axios from "axios";
import SecondaryButton from "../../components/Buttons/Secondary";
import { Card } from "components/Card";
import MusicItem from "components/MusicItem";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useStore } from "store";
import PrimaryButton from "../../components/Buttons/Primary";
import ReactModal from "react-modal";

function profile() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const [musicList, setMusicList] = useState([]);

  const [uploadModalOpen, setUploadModalOpen] = useState(true);

  ReactModal.setAppElement("#__next");

  useEffect(async () => {
    if (!user) return;
    console.log(user);
    // Update user doc
    const { data: userDoc } = await axios.get(
      "http://localhost:8000/api/profile/" + user["_id"]
    );
    const userData = {
      ...user,
      ...userDoc,
    };
    setUser(userData);

    if (userDoc.music.length > 0) {
      const { data: musicListArray, status } = await axios.get(
        "http://localhost:8000/api/music",
        {
          params: {
            ids: user.music,
          },
        }
      );

      if (status === 200) {
        setMusicList(musicListArray);
      }
    }
  }, []);

  function openUploadModal() {
    setUploadModalOpen(true);
  }

  function closeUploadModal() {
    setUploadModalOpen(false);
  }

  return (
    <div>
      <Head>
        <title>Profile - Dollop Music</title>
      </Head>
      {user ? (
        <div className="max-w-2xl md:max-w-7xl mx-5 md:mx-auto mt-10">
          {/* Header Card */}
          <div className="p-8 bg-dark-400 flex items-center justify-between rounded-lg shadow shadow-light-300">
            <div className="flex items-center space-x-5">
              <img
                src={user.image}
                alt=""
                className="w-25 h-25 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-semibold">{user.name}</h1>
                <h3 className="text-gray-400">{user.username}</h3>
              </div>
            </div>
            <div>
              <div className="space-x-2">
                <SecondaryButton>
                  <i className="fa fa-pencil"></i>&nbsp; Edit
                </SecondaryButton>
                <PrimaryButton>
                  <span onClick={openUploadModal}>
                    <i className="fa fa-upload"></i>&nbsp; Upload
                  </span>
                </PrimaryButton>
                {/* <PrimaryButton>Follow</PrimaryButton>
                <SecondaryButton>Message</SecondaryButton> */}
              </div>
            </div>
          </div>
          {/* End of Header Card */}
          {/* Grid */}
          <div className="mt-8 md:(grid grid-cols-3 gap-x-10)">
            {/* About the user */}
            <div className="col-span-2">
              <Card>
                <h1 className="text-xl font-semibold mb-5">About</h1>
                <p>{user.about}</p>
              </Card>
            </div>
            {/* User info */}
            <div className="col-span-1">
              <Card>
                <div className="flex justify-between">
                  <div className="-space-y-2">
                    <h1 className="text-sm font-medium mb-5">Followers</h1>
                    <p className="text-2xl">{user.followers}</p>
                  </div>
                  <div className="-space-y-2">
                    <h1 className="text-sm font-medium mb-5">Following</h1>
                    <p className="text-2xl">{user.following}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {/* User posts section */}
          <div className="mt-8">
            <Card>
              <h1 className="text-xl font-semibold mb-5">Your Music</h1>
              {musicList.length === 0 && <h3>No music yet</h3>}
              {musicList.map((music) => (
                <MusicItem music={music} isOwner={true} />
              ))}
            </Card>
          </div>
          {/* End of user posts section */}
        </div>
      ) : (
        <div className="max-w-2xl md:max-w-7xl mx-5 md:mx-auto mt-10">
          <h1 className="text-lg">
            <span>
              <i className="fa fa-lock"></i>
            </span>{" "}
            &nbsp;
            <Link href="/login">
              <span className="text-blue-500 cursor-pointer hover:underline">
                Log in
              </span>
            </Link>{" "}
            to view your profile
          </h1>
        </div>
      )}

      {/* Upload Modal */}
      <ReactModal
        isOpen={uploadModalOpen}
        onRequestClose={closeUploadModal}
        shouldCloseOnOverlayClick={true}
        className="bg-dark-900 text-white mx-auto mt-20 w-4/5 md:w-3/4"
      >
        
      </ReactModal>
    </div>
  );
}

export default profile;
