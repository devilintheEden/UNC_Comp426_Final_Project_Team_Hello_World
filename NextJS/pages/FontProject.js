import Head from "next/head";

import FontProjectInterface from "../components/FontProjectInterface.js";

export default function FontProject() {//FontProject
    return (
        <div className="container">
            <Head>
                <title>Font Project</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main id="root" className="pa0 w-100 min-h-100">
                <FontProjectInterface />
            </main>
        </div>
    );
}
