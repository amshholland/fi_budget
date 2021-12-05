import { Account, User } from '../model/account';
import { useContext, useState } from "react";

import axios from "axios";
import firebase from '../firebaseConfig';

const baseUrl = process.env.REACT_APP_API_URL || "";
if ( !baseUrl ) {
    console.error( "REACT_APP_API_URL environment variable not set." );
}

export async function getAccountByGoogleId( googleUser: firebase.User ) {
    axios.get( `${ baseUrl }/accounts/${ googleUser.uid }`, {
    } ).then( function ( res ) {
        console.log( res );
    } ).catch( function ( error ) {
        console.log( error );

        createAccount( googleUser );
    } );

}

export function createAccount( googleUser: firebase.User ): Promise<Account> {

    // const user: Account = {
    //     user: [ {
    //         googleId: googleUser.uid,
    //         name: googleUser.displayName || '',
    //         email: googleUser.email || '',
    //         userCreated: googleUser.metadata.creationTime || '',
    //         lastSignIn: googleUser.metadata.lastSignInTime || '',
    //         photoURL: googleUser.photoURL || ''
    //     } ]
    // };
    return axios.post( `${ baseUrl }/accounts`, googleUser ).then( res => res.data );
}

// export function getAccountData( user: User ): Promise<Account[]> {
//     // if (nodeEnvironment === "development") { //for offline development
//     //     return Promise.resolve(trucks);
//     // }
//     return axios.get( `${ baseUrl }/accounts`, user ).then( res => res.data );
// }
