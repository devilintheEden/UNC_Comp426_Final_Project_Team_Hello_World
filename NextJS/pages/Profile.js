import Head from "next/head";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { parseCookies } from "nookies";
import Project_list from "../components/new/Project_list.js";
import Header from "../components/HeaderFooter/Header.js";
import Footer from "../components/HeaderFooter/Footer.js";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uid: -1 };
        this.checkCookie();
        this.actionLogout = this.actionLogout.bind(this);
    }

    checkCookie() {
        const cookies = parseCookies();
        if (cookies) {
            fetch("./api/cookiesRelated", {
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
                    } else {
                        let jumplink = document.getElementById("jumplink");
                        jumplink.click();
                    }
                });
        } else {
            let jumplink = document.getElementById("jumplink");
            jumplink.click();
        }
    }

    actionLogout() {
        fetch("./api/cookiesRelated", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                uid: this.state.uid,
                cookie: "",
                timeStamp: new Date(),
            }),
        }).then(document.getElementById("jumplink").click());
    }
    render() {
        return (
            <div className="container ">
                <Head>
                    <title>Profile</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Header key={this.state.uid} uid={this.state.uid} />
                <main id="root" className="pa0 mw8 center min-h-100">
                    <h1>Profile</h1>
                    <div className="flex items-start mb2">
                        <div className="w-25 pa3 mr4 h2">
                            <u><a className="pointer" onClick={this.actionLogout}>Log out</a></u>
                        </div>
                        <div className="w-70 mr2">
                            <Project_list
                                key={this.state.uid}
                                uid={this.state.uid}
                            />
                        </div>
                    </div>
                </main>
                <Link href="/">
                    <a id="jumplink"></a>
                </Link>
                <Footer />
            </div>
        );
    }
}
