import "windi.css";

export default function Home({ Component }) {
  return (
    <div className="container">
      <main>
        <h1 className="text-red-500 text-9xl">Home</h1>
      </main>
      <Component />
    </div>
  );
}
