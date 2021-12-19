import axios from "axios";
import { useState } from "react";
import { useStore } from "store";

export default function MusicItem({ music, isOwner = false }) {
  const setMusic = useStore((state) => state.setMusic);

  const [claps, setClaps] = useState(music.claps);
  async function clap(id) {
    const { data, status } = await axios.post(
      "http://localhost:8000/api/music/clap",
      {
        id: id,
      }
    );
    if (status === 200) {
      setClaps(claps + 1);
    } else console.error("Unable to clap " + data);
  }

  function playMusic() {
    setMusic({
      title: music.name,
      artists: music.artists,
      imageUrl: music.image,
      url: music.music,
    });
  }
  return (
    <div
      className="flex justify-between items-center mt-1 rounded-lg p-2 hover:(bg-dark-100 cursor-pointer)"
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
      <div className="flex space-x-2">
        <div
          onClick={() => clap(music["_id"])}
          className="flex space-x-2 items-center cursor-pointer"
        >
          <span className="text-xl">👏🏻</span>
          <span>{claps}</span>
        </div>
        {isOwner == true ? (
          <div>
            <span className="mr-2">|</span>
            <button className="text-red-500 px-2 focus:(outline-none ring ring-red-600) transition hover:(text-red-600)">
              Delete
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
