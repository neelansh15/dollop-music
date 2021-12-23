import axios from "axios";
import { useState } from "react";
import { useStore } from "store";

export default function MusicItem({
  music,
  isOwner = false,
  disableClaps = false,
  className = "",
  onDeleteCallback,
}) {
  const apiUrl = useStore((state) => state.apiUrl);
  const user = useStore((state) => state.user);
  const musicState = useStore((state) => state.music);
  const setMusic = useStore((state) => state.setMusic);

  const [claps, setClaps] = useState(music.claps);
  async function clap() {
    const id = music["_id"];
    const { data, status } = await axios.post(`${apiUrl}/api/music/clap`, {
      id: id,
    });
    if (status === 200) {
      setClaps(claps + 1);
    } else console.error("Unable to clap " + data);
  }

  async function deleteMusic() {
    console.log(music.name);
    if (window.confirm("Are you sure you want to delete " + music.name + "?")) {
      const id = music["_id"];
      const { data, status } = await axios.delete(`${apiUrl}/api/music/`, {
        data: {
          id: id,
          userId: user._id,
          token: user.token,
        },
      });
      if (status === 200) {
        alert("Deleted music successfully");
      } else console.error("Unable to delete " + data);
    }
    onDeleteCallback();
  }

  function playMusic() {
    if (musicState?.id === music._id) return;
    setMusic({
      id: music._id,
      title: music.name,
      artists: music.artists,
      imageUrl: music.image,
      url: music.music,
    });
  }
  return (
    <div
      className={
        "flex justify-between items-center mt-1 rounded-lg p-2 hover:(bg-dark-100 cursor-pointer) " +
        className
      }
      onClick={playMusic}
    >
      <div className="flex space-x-3 items-center">
        <img
          src={music.image}
          alt=""
          className="rounded-lg w-15 h-15 object-cover"
        />
        <div>
          <h1 className="font-bold">{music.name}</h1>
          {music.artists ? (
            <p className="text-sm text-gray-300">{music.artists}</p>
          ) : (
            <p />
          )}
        </div>
      </div>
      {user && !disableClaps && (
        <div className="flex space-x-2">
          <div
            onClick={clap}
            className="flex space-x-2 items-center cursor-pointer"
          >
            <span className="text-xl">👏🏻</span>
            <span>{claps}</span>
          </div>
          {isOwner == true ? (
            <div>
              <span className="mr-2">|</span>
              <button
                onClick={deleteMusic}
                className="text-red-500 px-2 focus:(outline-none ring ring-red-600) transition hover:(text-red-600)"
              >
                Delete
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
