import Head from "next/head";
import Home from "../components/Home";

export default function Index() {
  return (
    <div>
      <Head>
        <title>Dollop Music</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Home />
      </main>
    </div>
  );
}
