import Head from 'next/head'

import DownloadForm from '../components/DownloadForm.js'
import Pagination from '../components/Pagination'
import ProjectDetail from '../components/ProjectDetail.js'
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
        <ProjectDetail />
      </main>

      {/* 
      
      If using tachyons, no need to have an extra style. 

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style> */}
    </div>
  )
}

