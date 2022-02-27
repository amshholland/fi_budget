import { createContext, ReactNode, useEffect, useState } from "react";
import firebase from '../firebaseConfig';
import { Account } from "../model/account";
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
              getAccountByGoogleId( newUser! ).then( ( account ) => {
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