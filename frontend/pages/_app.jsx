import "windi.css";
import Navbar from "../components/Navbar";

export default function Home({ Component }) {
  return (
    <div className="h-screen w-full bg-dark-800 text-white">
      <Navbar />
      <main>
        <Component />
      </main>
    </div>
  );
}
