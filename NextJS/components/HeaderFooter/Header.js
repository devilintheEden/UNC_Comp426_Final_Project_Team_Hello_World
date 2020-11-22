import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Popup from "reactjs-popup";
import LoginForm from "../LogIn/LoginForm.js";
import SignUpForm from "../LogIn/SignUpForm.js";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signinpopup: false,
            popWidth: "250px",
            type: <div></div>,
            profilePicPath: null,
        };
        this.toggleSignInPopup = this.toggleSignInPopup.bind(this);
        this.jumpLogIn = this.jumpLogIn.bind(this);
        this.jumpSignUp = this.jumpSignUp.bind(this);
        if (this.props.uid !== -1) {
            this.getProfilePic();
        }
    }

    toggleSignInPopup() {
        this.setState({ signinpopup: !this.state.signinpopup });
        if (this.state.signinpopup) {
            this.setState({ popWidth: "250px" });
            this.setState({ type: <div></div> });
        }
    }

    jumpLogIn() {
        this.setState({ popWidth: "600px" });
        this.setState({ type: <LoginForm /> });
    }

    jumpSignUp() {
        this.setState({ popWidth: "600px" });
        this.setState({ type: <SignUpForm /> });
    }

    getProfilePic() {
        fetch("/api/getUserInfo", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                uid: this.props.uid,
                timeStamp: new Date(),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ profilePicPath: data.profile.profilePic });
            });
    }
    render() {
        return (
            <header className="sans-serif">
                <div className="bg-black-80">
                    <nav className="dt w-100 mw8 center">
                        <div className="dtc w2 v-mid pa3">
                            <Link href="/">
                                <a href="/" className="dib w5 h2 pa1">
                                    <img src="/Backend/Resources/logo.png"></img>
                                </a>
                            </Link>
                        </div>
                        <div className="dtc v-mid tr pa3">
                            <Link href="/">
                                <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
                                    Home{" "}
                                </a>
                            </Link>
                            <Link href="/FontProject">
                                <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3">
                                    Get Started{" "}
                                </a>
                            </Link>
                            <Link href="/Community">
                                <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3">
                                    Community{" "}
                                </a>
                            </Link>
                            {this.props.uid === -1 ? (
                                <a
                                    className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba"
                                    onClick={this.toggleSignInPopup}
                                >
                                    Sign In
                                </a>
                            ) : (
                                    <Link href="/Profile">
                                        <a className="dib ml2 pv2 ph3">
                                            {this.state.profilePicPath ? (
                                                <img
                                                    src={this.state.profilePicPath}
                                                    width="40"
                                                    height="40"
                                                ></img>
                                            ) : (
                                                    <span></span>
                                                )}
                                        </a>
                                    </Link>
                                )}
                        </div>
                    </nav>
                    <Popup
                        closeOnDocumentClick={false}
                        open={this.state.signinpopup}
                        contentStyle={{ width: this.state.popWidth }}
                    >
                        <div className="modal">
                            <a
                                className="close"
                                onClick={this.toggleSignInPopup}
                            >
                                &times;
                            </a>
                            {this.state.popWidth === "250px" ? (
                                <ul className="list pl0 measure center">
                                    <li>
                                        <a
                                            onClick={this.jumpSignUp}
                                            style={{ width: "235px" }}
                                            className="f6 link dim br2 ba bw1 ph3 pv2 mb2 dib black tc"
                                            href="#0"
                                        >
                                            Sign up with Email
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={this.jumpLogIn}
                                            style={{ width: "235px" }}
                                            className="f6 link dim br2 ba bw1 ph3 pv2 mb2 dib black tc"
                                            href="#0"
                                        >
                                            Log in with Email
                                        </a>
                                    </li>
                                </ul>
                            ) : (
                                    this.state.type
                                )}
                        </div>
                    </Popup>
                </div>
            </header>
        );
    }
}
