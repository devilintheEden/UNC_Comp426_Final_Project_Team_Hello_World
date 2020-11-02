import Head from "next/head";
import Header from "../components/HeaderFooter/Header.js";
import Footer from "../components/HeaderFooter/Footer.js";

export default function Community() {
    return (
        <div className="container">
            <Head>
                <title>Community</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main id="root" className="pa0 w-100 min-h-100">
                <h1>Community</h1>
            </main>
            <Footer />
        </div>
    );
}
