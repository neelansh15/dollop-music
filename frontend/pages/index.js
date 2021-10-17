import Head from 'next/head'
import { Button } from 'antd'

import 'antd/dist/antd.css'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Dollop Music</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Home</h1>
        <Button>Click me</Button>
      </main>
      </div>
    )
}