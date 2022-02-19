import "./Header.css";

import { signInWithGoogle, signOut } from "../../firebaseConfig";
import { useContext, useRef, useState } from "react";

import { AuthContext } from "../../context/auth-context";
import NavButtons from "./NavButtons";
import UserButtons from "./UserButtons";
import { useHistory } from "react-router-dom";

function Header() {
  const { user } = useContext( AuthContext );
  const [ displayNavButtons, setDisplayNavButtons ] = useState( "none" );
  const [ displayUserButtons, setDisplayUserButtons ] = useState( "none" );
  console.log( displayNavButtons );

  function navButtons() {
    if ( displayNavButtons === "none" ) {
      setDisplayNavButtons( "flex" );
    } else if ( displayNavButtons === "flex" ) {
      setDisplayNavButtons( "none" );
    }
  }

  return (
    <header className="Header" id="header">

      <div className="navDiv">
        <img className="hamburgerIcon" src={ process.env.PUBLIC_URL + '/hamburger_icon.jpg' } alt="Nav Links" onClick={ () => navButtons() } />
        <NavButtons showNavButtons={ displayNavButtons } onClickOutside={ () => navButtons() } />
      </div>

      <div className="logoDiv">
        <a href="/">
          <img className="logo" src={ process.env.PUBLIC_URL + '/logo192.png' } alt="Financial Independence Logo" />
        </a>
      </div>

      { user && (
        <div className="userDiv">
          <div className="userPhoto" onClick={ () => { setDisplayUserButtons( "flex" ); } }>
            { !!user.photoURL && (
              <img src={ user.photoURL } alt="google avatar" id="profilePic" />
            ) }
          </div>
          <UserButtons showUserButtons={ displayUserButtons } onClickOutside={ () => { setDisplayUserButtons( "none" ); } } />
        </div>
      ) }

      <div className="signInDiv">
        { !user && (
          <button className="headerButton" onClick={ signInWithGoogle }>
            Sign In
          </button>
        ) }
      </div>
    </header>
  );
}

export default Header;