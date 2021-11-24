import "windi.css";
import "../assets/css/main.css";
import Navbar from "../components/Navbar";
// import MusicPlayer from "components/MusicPlayer";

export default function Home({ Component }) {
  return (
    <div className="h-screen w-full bg-dark-800 text-white font-poppins">
      <Navbar />
      <main>
        <Component />
      </main>
      {/* <MusicPlayer /> */}
    </div>
  );
}
