import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { parseCookies } from "nookies";
import Header from "../components/HeaderFooter/Header.js";
import Footer from "../components/HeaderFooter/Footer.js";

export default class Community extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uid: -1, profilePicPath: "" };
        this.checkCookie();
    }

    checkCookie() {
        const cookies = parseCookies();
        if (cookies) {
            fetch("http://localhost:3000/api/cookiesRelated", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    cookie: cookies.Calli2Digital_thisSessionCookie,
                    timeStamp: new Date(),
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.uid !== -1) {
                        this.setState({ uid: data.uid });
                    }
                });
        }
    }

    render() {
        return (
            <div className="container">
                <Head>
                    <title>Community</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="google-signin-client_id" content="2632322765-1q6o3aucrg484d4poc95vbio3025hde9.apps.googleusercontent.com"/>
                    <script src="https://apis.google.com/js/platform.js" async defer></script>
                </Head>
                <Header key={this.state.uid} uid={this.state.uid} />
                <main id="root" className="pa0 w-100 min-h-100">
                    <h1>Community</h1>
                </main>
                <Footer />
            </div>
        );
    }
}
