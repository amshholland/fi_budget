import { ReactNode, createContext, useEffect, useState } from "react";

import { User } from "../model/account";
import firebase from '../firebaseConfig';
import { getAccountByGoogleId } from "../service/Account";

export interface AuthContextModel {
    user: firebase.User | null;
    userFromDb: User | null;
}

const defaultValue: AuthContextModel = {
    user: null,
    userFromDb: null
};

export const AuthContext = createContext( defaultValue );

export function AuthContextProvider( { children }: { children: ReactNode; } ) {
    const [ user, setUser ] = useState<firebase.User | null>( null );
    const [ userFromDb, setUserFromDb ] = useState<User | null>( null );

    useEffect( () => {
        return firebase.auth().onAuthStateChanged( newUser => {
            setUser( newUser );
            if ( newUser !== null ) {
                getAccountByGoogleId( newUser! );
            }
        } );
    }, [] );


    return (
        <AuthContext.Provider value={ { user, userFromDb } }>
            { children }
        </AuthContext.Provider>
    );
};