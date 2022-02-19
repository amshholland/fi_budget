import "./Header.css";

import { Link, useHistory } from "react-router-dom";
import { useEffect, useRef } from "react";

import { signOut } from "../../firebaseConfig";

interface Props {
  onClickOutside: () => void;
  showUserButtons: string;
}

function UserButtons( { onClickOutside, showUserButtons }: Props ) {
  const ref: any = useRef( null );

  useEffect( () => {
    const handleClickOutside = ( e: { target: any; stopPropagation: () => void; } ) => {
      if ( ref.current && !ref.current.contains( e.target ) ) {
        onClickOutside && onClickOutside();
        e.stopPropagation();
      }
    };

    document.addEventListener( 'click', handleClickOutside, true );
    return () => {
      document.removeEventListener( 'click', handleClickOutside, true );
    };
  }, [ onClickOutside ] );

  if ( showUserButtons === "none" )
    return null;

  return (
    <div className="UserButtons" ref={ ref }>
      <div className="buttonGroup" style={ { display: showUserButtons } }>
        <button className="headerButton" onClick={ () => onClickOutside() }>
          <Link className="buttonLink" to="/budget">EditAccount</Link>
        </button>
        <button className="headerButton" id="signOut" onClick={ signOut }>
          Sign out
        </button>
      </div>
    </div>
  );
}

export default UserButtons;