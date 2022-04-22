import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import {RiCloseLine, RiMenu3Line} from 'react-icons/ri';
import AuthContext from "../context/AuthContext";
import LogOut from '../auth/LogOut';
import logo from '../../logos.png';
import '../layout/navbar.css';


function Navbar() {
    const {loggedIn} = useContext(AuthContext);
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className="gpt3__navbar">
            <div className="gpt3__navbar-links">
                <div className="gpt3__navbar-links_logo">
                    <img src={logo} alt="logo" />
                </div>

                <div className='gpt3__navbar-links_container'>
                    <p> <Link  to='/'>HOME</Link></p>
                    {loggedIn === false && (
                        <>
                            <p>  <Link  to='/register'>Register</Link> </p>
                            <p> <Link  to='/login'>Log In</Link> </p>
                        </>
                    )}
                    {loggedIn === true && (
                        <>
                            <p> <Link  to='/create'>Create Post</Link> </p>
                            <p><Link  to='/mypost'>My Feeds</Link> </p>

                            <p> <LogOut /> </p>
                        </>
                    )}
                </div>
            </div>

            <div className="gpt3__navbar-menu">
                {toggleMenu
                    ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                    : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
            <div className="gpt3__navbar-menu_container scale-up-center">
                <div className="gpt3__navbar-menu_container-links">
                <p> <Link  to='/'>HOME</Link></p>
                    {loggedIn === false && (
                        <>
                            <p>  <Link  to='/register'>Register</Link> </p>
                            <p> <Link  to='/login'>Log In</Link> </p>
                        </>
                    )}
                    {loggedIn === true && (
                        <>
                            <p> <Link  to='/create'>Create Post</Link> </p>
                            <p><Link  to='/mypost'>My Feeds</Link> </p>

                            <p> <LogOut /> </p>
                        </>
                    )}
                </div>
            </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;