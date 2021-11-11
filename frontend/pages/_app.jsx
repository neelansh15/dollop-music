import "windi.css";

export default function Home({ Component }) {
  return (
    <div className='container'>
      <main>
        <h1 className='text-red-500 text-2xl'>Home</h1>
      </main>
      <Component />
    </div>
  );
}
