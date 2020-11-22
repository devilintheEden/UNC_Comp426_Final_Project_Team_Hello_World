import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';
import Logo from '../Images/Logo1.svg';

function Navbar() {

    return (
        <div className="navbar">
            <div className="navbar-container">
                <Link className="logo" to="/">
                    <img id="logo" src={Logo} alt="logo"/>
                </Link>
                <div className="links">
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/getstarted">Get Started</Link>
                    <Link className="link" to="/community">Community</Link>
                    <Link className="link" to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;

