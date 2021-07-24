import { ReactNode, createContext, useEffect, useState } from "react";
import { addNewUser, getUserById } from "../service/UserService";

import { User } from "../model/user";
import firebase from '../firebaseConfig';

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
            addUser( newUser! );
        } );
    }, [] );

    async function addUser( user: firebase.User ) {
        let existingUser = getUserById( user.uid ).then( setUserFromDb );
        if ( !existingUser ) {
            let newUser = {
                _id: user.uid,
                name: user.displayName,
                email: user.email,
                userCreated: user.metadata.creationTime,
                lastSignIn: user.metadata.lastSignInTime,
                photoURL: user.photoURL,
                budgetDay: undefined
            };
            addNewUser( newUser );
            setUserFromDb( newUser );
        }
    }

    return (
        <AuthContext.Provider value={ { user, userFromDb } }>
            { children }
        </AuthContext.Provider>
    );
};