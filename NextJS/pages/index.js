import Head from 'next/head'

import ItemsGrid from '../components//GridLayout/ItemsGrid'
import FontProjectInterface from '../components/FontProjectInterface.js'


export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id='root'>
        <h1>Font Project</h1>
        <FontProjectInterface />
        <ItemsGrid col='3' row='4' count='95' />
      </main>

    </div>
  )
}

