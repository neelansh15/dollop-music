import "windi.css";
import "../assets/css/main.css";
import "../assets/css/form.css";
import Navbar from "../components/Navbar";
import MusicPlayer from "components/MusicPlayer";

export default function Home({ Component }) {
  return (
    <div
      id="myroot"
      className="min-h-screen pb-30 w-full bg-dark-800 text-white font-poppins"
    >
      <Navbar />
      <main>
        <Component />
      </main>
      <MusicPlayer />
    </div>
  );
}
