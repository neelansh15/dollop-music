import "windi.css";

export default function Home({ Component }) {
  return (
    <div className='container'>
      <main>
        <h1 className='text-red-500 text-4xl'>Dollop Music</h1>
      </main>
      <Component />
    </div>
  );
}
