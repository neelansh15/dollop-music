import "windi.css";


export default function Home({Component, pageProps}) {
  return (
    <div className='container'>
      <Head>
        <title>Dollop Music</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='text-red-500 text-9xl'>Home</h1>

        <Component {...pageProps} />
      </main>
    </div>
  );
}
