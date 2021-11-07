import "./Header.css";

import { Link, useHistory } from "react-router-dom";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";

function Header() {
    const { user } = useContext( AuthContext );
    console.log( user );
    const [ signOutToggle, setSignOutToggle ] = useState( "none" );

    function signOutDisplay() {
        if ( signOutToggle === "none" ) {
            setSignOutToggle( "flex" );
        } else if ( signOutToggle === "flex" ) {
            setSignOutToggle( "none" );
        }
    }

    const history = useHistory();

    return (
        <header className="Header" id="header">
            <div className="logoDiv">
                <a href="/">
                    <img className="logo" src={ process.env.PUBLIC_URL + '/logo192.png' } alt="Financial Independence Logo" />
                </a>
            </div>
            { user && (
                <div className="loggedInHeader" >
                    <div className="googleUser">
                        <div className="userPhoto" onClick={ () => signOutDisplay() }>
                            { !!user.photoURL && (
                                <img src={ user.photoURL } alt="google avatar" id="profilePic" />
                            ) }
                        </div>
                        <div className="nav" style={ { display: signOutToggle } }>
                            <ul>
                                <li><Link to="/create">Create</Link></li>
                                <li><Link to="/customize">Customize</Link></li>
                                <li><Link to="/goals">Goals</Link></li>
                                <li><Link to="/net-worth">Net Worth</Link></li>
                                <li><Link to="/transactions">Transactions</Link></li>
                                <button className="headerButton" id="signOut" onClick={ signOut }>
                                    Sign out
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            ) }

            <div className="googleAuth">
                { !user && (
                    <button className="headerButton" onClick={ signInWithGoogle }>
                        Sign In
                    </button>
                ) }
            </div>
        </header >
    );
}

export default Header;
