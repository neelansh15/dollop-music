import { Card } from "./Card";
import MusicItem from "./MusicItem";
import axios from "axios";
import { useEffect, useState } from "react";
import ArtistItem from "./ArtistItem";
import { useStore } from "../store";

export default function Home() {
  const apiUrl = useStore((state) => state.apiUrl);
  const [popularMusic, setMusicList] = useState([]);
  const [popularArtist, setArtistList] = useState([]);

  useEffect(async () => {
    const { data: musicListArray, status } = await axios.get(
      `${apiUrl}/api/music/most_clapped`
    );

    if (status === 200) {
      setMusicList(musicListArray);
    }
    const { data: userListArray, status: status2 } = await axios.get(
      `${apiUrl}/api/profile/most_followed`
    );

    if (status2 === 200) {
      setArtistList(userListArray);
    }
  }, []);

  return (
    <div className="px-15 pt-10 w-full">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* 2/3 column grid */}
      <div className="grid grid-cols-5 gap-x-5 mt-10">
        <div className="col-span-5 md:col-span-3">
          <Card>
            <h1 className="text-xl font-semibold mb-5">Popular Songs</h1>

            {popularMusic.map((music) => (
              <MusicItem music={music} key={music.name} />
            ))}
          </Card>
        </div>
        <div className="col-span-5 md:col-span-2">
          <Card>
            <h1 className="text-xl font-semibold mb-5">Popular Artists</h1>
            {popularArtist.map((artist) => (
              <ArtistItem artist={artist} key={artist._id} />
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
