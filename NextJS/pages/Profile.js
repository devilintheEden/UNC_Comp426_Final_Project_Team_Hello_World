import Head from "next/head";


export default function Profile() {//FontProject
    return (
        <div className="container">
            <Head>
                <title>Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main id="root" className="pa0 w-100 min-h-100">
                <h1>Profile</h1>
            </main>
        </div>
    );
}