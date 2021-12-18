import { Account } from '../model/account';
import axios from "axios";
import firebase from '../firebaseConfig';

const baseUrl = process.env.REACT_APP_API_URL || "";
if ( !baseUrl ) {
    console.error( "REACT_APP_API_URL environment variable not set." );
}

export async function getAccountByGoogleId( googleUser: firebase.User ): Promise<Account> {
    return axios.get( `${ baseUrl }/accounts/${ googleUser.uid }` ).then( res => res.data )
        .catch( function ( error ) {
            console.log( error );
            console.log( "user does not exist" );
            createAccount( googleUser );
        } );
}

export function createAccount( googleUser: firebase.User ): Promise<Account> {
    const user: Account = {
        user: [ {
            googleId: googleUser.uid,
            name: googleUser.displayName || '',
            email: googleUser.email || '',
            userCreated: googleUser.metadata.creationTime || '',
            lastSignIn: googleUser.metadata.lastSignInTime || '',
            photoURL: googleUser.photoURL || ''
        } ]
    };
    return axios.post( `${ baseUrl }/accounts`, user ).then( res => res.data );
}