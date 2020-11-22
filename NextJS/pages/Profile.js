import Head from "next/head";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { parseCookies } from "nookies";
import Project_list from "../components/ProfilePage/Project_list.js";
import Header from "../components/HeaderFooter/Header.js";
import Footer from "../components/HeaderFooter/Footer.js";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uid: -1 };
        this.checkCookie();
        this.actionLogout = this.actionLogout.bind(this);
        this.update = this.update.bind(this);
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

    update(){
        fetch("http://localhost:3000/api/userUpdate", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    uid: this.state.uid,
                    profileName: "aaa", // optional
                    profilePic: "", // optional
                    profileBio: "qwerTY", // optional
                    timeStamp: new Date(),
                }),
            })
                .then(()=>{console.log("aaaa")});
        }

    actionLogout() {
        fetch("http://localhost:3000/api/cookiesRelated", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                uid: this.state.uid,
                cookie: "",
                timeStamp: new Date(),
            }),
        }).then(() => {
            gapi.load("auth2", function () {
                let auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(() => {
                    document.getElementById("homepage").click();
                });
            });
        });
    }

    render() {
        return (
            <div className="container ">
                <Head>
                    <title>Profile</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="google-signin-client_id" content="2632322765-1q6o3aucrg484d4poc95vbio3025hde9.apps.googleusercontent.com"/>
                    <script src="https://apis.google.com/js/platform.js" async defer></script>
                </Head>
                <Header key={this.state.uid} uid={this.state.uid} />
                <main id="root" className="pa0 mw8 center min-h-100">
                    <h1>Profile</h1>
                    <div className="flex items-start mb2">
                        <div className="w-25 pa3 mr4 h2">
                            <u>
                                <a
                                    className="pointer"
                                    onClick={this.actionLogout}
                                >
                                    Log out
                                </a>
                            </u>
                            <br/>
                            <u>
                                <a
                                    className="pointer"
                                    onClick={this.update}
                                >
                                    Update test
                                </a>
                            </u>
                        </div>
                        <div className="w-70 mr2">
                            <Project_list
                                key={this.state.uid}
                                uid={this.state.uid}
                            />
                        </div>
                    </div>
                    <Link href="/">
                        <a href="/" id="homepage"></a>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }
}
