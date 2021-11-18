import "windi.css";

export default function Home({ Component }) {
  return (
    <div className="h-screen w-full">
      <main>
        <Component />
      </main>
    </div>
  );
}
