import Head from 'next/head'
import Canvas from '../components/OnlineDesigning/Canvas'
function Online() {
    return (
        <div>
            <Head>
                <title>My page title</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Canvas />
        </div>
    )
}

export default Online