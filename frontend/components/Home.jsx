import { Card } from "./Card";
import MusicItem from "./MusicItem";
import axios from "axios";
import { useEffect, useState } from "react";
import ArtistItem from "./ArtistItem";
import { useStore } from "../store";

export default function Home() {
  const apiUrl = useStore((state) => state.apiUrl);
  const [popularMusic, setMusicList] = useState([]);
  const [recentMusic, setRecentMusic] = useState([]);
  const [popularArtist, setArtistList] = useState([]);

  useEffect(async () => {
    // Fetch most clapped music
    const { data: musicListArray, status } = await axios.get(
      `${apiUrl}/api/music/most_clapped`
    );

    if (status === 200) {
      setMusicList(musicListArray);
    }

    // Fetch most followed people
    const { data: userListArray, status: status2 } = await axios.get(
      `${apiUrl}/api/profile/most_followed`
    );

    if (status2 === 200) {
      setArtistList(userListArray);
    }

    // Fetch recent music for featuring on dashboard
    const { data: recentMusicArray, status: status3 } = await axios.get(
      `${apiUrl}/api/music/recent`
    );
    console.log("Recent music data", recentMusicArray);
    if (status3 === 200) {
      setRecentMusic(recentMusicArray);
    }
  }, []);

  return (
    <div className="px-15 pt-10 w-full">
      {/* Featured Jumbotron */}
      {recentMusic.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {recentMusic.map((music, i) => (
            <div
              className="flex flex-col p-4 w-35 h-35 md:(w-64 h-64) rounded-lg enter-animation"
              style={{
                flex: "0 1 auto",
                background:
                  "linear-gradient(to top, rgba(0,0,0), rgba(255,255,255,0)), url('" +
                  music.image +
                  "')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                "--animation-order": i,
              }}
            >
              <div className="mt-auto">
                <h1 className="md:(text-lg) font-semibold">{music.name}</h1>
                <h2 className="text-true-gray-400">{music.artists}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 2/3 column grid */}
      <div className="grid grid-cols-5 gap-x-5 mt-10">
        <div className="col-span-5 md:col-span-3">
          <Card>
            <h1 className="text-xl font-semibold mb-5">Popular Songs</h1>

            {popularMusic.map((music, i) => (
              <MusicItem
                music={music}
                key={music._id}
                className="enter-animation"
                style={{ "--animation-order": i }}
              />
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
