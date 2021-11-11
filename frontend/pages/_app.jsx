import "windi.css";

export default function Home({ Component }) {
  return (
    <div className="h-screen w-full bg-dark-800 text-white">
      <main>
        <Component />
      </main>
    </div>
  );
}
