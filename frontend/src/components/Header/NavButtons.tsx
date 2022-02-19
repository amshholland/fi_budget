import "./Header.css";

import { useEffect, useRef } from "react";

import { Link } from "react-router-dom";

interface Props {
  onClickOutside: () => void;
  showNavButtons: string;
}

function NavButtons( { onClickOutside, showNavButtons }: Props ) {
  const ref: any = useRef( null );

  useEffect( () => {
    const handleClickOutside = ( e: { target: any; } ) => {
      if ( ref.current && !ref.current.contains( e.target ) ) {
        onClickOutside && onClickOutside();
      }
    };

    document.addEventListener( 'click', handleClickOutside, true );
    return () => {
      document.removeEventListener( 'click', handleClickOutside, true );
    };
  }, [ onClickOutside ] );

  if ( showNavButtons === "none" )
    return null;

  return (
    <div className="NavButtons" ref={ ref }>
      <div className="buttonGroup" style={ { display: showNavButtons } }>
        <button className="headerButton" onClick={ () => onClickOutside() }><Link className="buttonLink" to="/budget">Budget</Link></button>
        <button className="headerButton" onClick={ () => onClickOutside() }><Link className="buttonLink" to="/transactions">Transactions</Link></button>
      </div>
    </div>
  );
}

export default NavButtons;