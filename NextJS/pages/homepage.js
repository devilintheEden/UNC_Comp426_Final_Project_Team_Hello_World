import Head from 'next/head'
import Banner from '../components/Banner/Banner'
function Homepage() {
    return (
        <div>
            <Head>
                <title>My page title</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Banner />
        </div>
    )
}

export default Homepage