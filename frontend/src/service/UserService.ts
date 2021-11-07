import { Account, User } from '../model/user';

import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL || "";
if ( !baseUrl ) {
    console.error( "REACT_APP_API_URL environment variable not set." );
}

export function getUserById( userId: string ): Promise<User> {
    return axios.get( `${ baseUrl }/accounts`, {
        params: { userId: userId }
    } ).then( res => res.data );
}

export function addNewUser( user: User ): Promise<User> {
    console.log( `addNewUser: ${ user }` );
    return axios.post( `${ baseUrl }/accounts`, user ).then( res => res.data );
}

export function getAccountData(): Promise<Account[]> {
    // if (nodeEnvironment === "development") { //for offline development
    //     return Promise.resolve(trucks);
    // }
    return axios.get( baseUrl ).then( res => res.data );
}
