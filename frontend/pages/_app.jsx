import "windi.css";
import "../assets/css/main.css"
import Navbar from "../components/Navbar";
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'

export default function Home({ Component }) {
  return (
    <div className="h-screen w-full bg-dark-800 text-white font-poppins">
      <Navbar />
      <main>
        <Component />
      </main>
      <footer>
        <ReactJkMusicPlayer />
      </footer>
    </div>
  );
}
