import Head from "next/head";
import Header from "../components/HeaderFooter/Header.js";
import Footer from "../components/HeaderFooter/Footer.js";
import FontProjectInterface from "../components/FontProjectInterface.js";

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <main>
                <img className="w-100" src="/Backend/Resources/placeholder.jpg"></img>
            </main>
            <Footer/>
        </div>
    );
}
