import './Tables.css';

import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import { TableHeader } from './Table/TableHeader';
import Transaction from '../model/transaction';
import { TransactionTable } from './Table/TransactionTable';
import { getTransactionsForAccount } from '../service/Transaction';

export function ExistingTransactionData() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState<Transaction[]>( [] );
  const [ dataLoaded, setDataLoaded ] = useState( false );

  const headerLabels = [ "", "Category", "Amount", "Date", "", "" ];

  useEffect( () => {
    loadTransactionData();
  }, [] );

  function loadTransactionData() {
    if ( userFromDb ) {
      getTransactionsForAccount( userFromDb._id! ).then( ( transaction ) => {
        setRows( transaction );
        setDataLoaded( true );
      } );
    }
  }

  return (
    <table className="ExistingTransactionData">
      { !dataLoaded ? (
        <tr><td id="loading">Loading...</td></tr>
      ) : rows.length === 0 ? (
        <tr><td>Create Your Transaction Below</td></tr>
      ) : (
        <>
          <TableHeader headerLabels={ headerLabels } />
        </>
      )
      }
    </table >
  );
};