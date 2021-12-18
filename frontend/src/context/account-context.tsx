import { ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { createAccount, getAccountByGoogleId } from '../service/Account';

import { Account } from '../model/account';
import { AuthContext } from './auth-context';

interface AccountContextValue {
    userAccount: Account | null;
}

const defaultValue: AccountContextValue = {
    userAccount: null
};

export const AccountContext = createContext( defaultValue );

export function AccountContextProvider( { children }: { children: ReactNode; } ) {
    const { user } = useContext( AuthContext );
    const [ userAccount, setUserAccount ] = useState<Account | null>( null );

    useEffect( () => {
        if ( user ) {
            getAccountByGoogleId( user ).then( ( account ) => {
                console.log( account );
                setUserAccount( account );
            } );
        }
    }, [ user ] );

    return (
        <AccountContext.Provider value={ { userAccount } }>
            { children }
        </AccountContext.Provider>
    );
}