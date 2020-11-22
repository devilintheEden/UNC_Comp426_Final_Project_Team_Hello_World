import Head from "next/head";
import FontProjectInterface from "../components/FontProjectInterface.js";
import fetch from "isomorphic-unfetch";
import { parseCookies } from "nookies";

export default class FontProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uid: -1 };
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
                    <title>Font Project</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main id="root" className="pa0 w-100 min-h-100">
                    <FontProjectInterface />
                </main>
            </div>
        );
    }
}
