import "windi.css";
import Head from "next/head";

export default function Home() {
  return (
    <div className='container'>
      <Head>
        <title>Dollop Music</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='text-red-500 text-9xl'>Home</h1>
      </main>
    </div>
  );
}
