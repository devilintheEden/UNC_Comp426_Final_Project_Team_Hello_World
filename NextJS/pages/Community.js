import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { parseCookies } from "nookies";
import Header from "../components/HeaderFooter/Header.js";
import Footer from "../components/HeaderFooter/Footer.js";
import SearchBar from '../components/SearchBar'
import { InputCursor } from "react-bootstrap-icons";
import toggleAutoSuggestion from "../helper_scripts/ToggleAutoSuggestion.js";

export default class Community extends React.Component {
    constructor(props) {
        super(props);
        this.state = { uid: -1 };
        this.checkCookie();
    }

    componentDidMount() {
        toggleAutoSuggestion()
    }

    checkCookie() {
        const cookies = parseCookies();
        if (cookies) {
            fetch("/api/cookiesRelated", {
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
                </Head>
                <Header key={this.state.uid} uid={this.state.uid} />
                <SearchBar />
                <main id="root" className="pa0 w-100 min-h-100">
                    <h1>Community</h1>
                </main>
                <Footer />
            </div>
        );
    }
}
