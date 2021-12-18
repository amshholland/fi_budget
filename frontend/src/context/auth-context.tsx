import { Account, User } from "../model/account";
import { ReactNode, createContext, useEffect, useState } from "react";

import firebase from '../firebaseConfig';
import { getAccountByGoogleId } from "../service/Account";

export interface AuthContextModel {
    user: firebase.User | null;
    userFromDb: Account | null;
}

const defaultValue: AuthContextModel = {
    user: null,
    userFromDb: null
};

export const AuthContext = createContext( defaultValue );

export function AuthContextProvider( { children }: { children: ReactNode; } ) {
    const [ user, setUser ] = useState<firebase.User | null>( null );
    const [ userFromDb, setUserFromDb ] = useState<Account | null>( null );

    useEffect( () => {
        return firebase.auth().onAuthStateChanged( newUser => {
            setUser( newUser );
            if ( newUser !== null ) {
                console.log( 'getting account id' );
                getAccountByGoogleId( newUser! ).then( ( account ) => {
                    console.log( account );
                    setUserFromDb( account );
                } );;
            }
        } );
    }, [] );


    return (
        <AuthContext.Provider value={ { user, userFromDb } }>
            { children }
        </AuthContext.Provider>
    );
};