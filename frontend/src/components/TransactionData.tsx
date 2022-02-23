import './Tables/Tables.css';

import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import { DataTable } from './Tables/DataTable';
import Transaction from '../model/transaction';
import { getTransactionsForAccount } from '../service/Transaction';

export function TransactionData() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState<Transaction[]>( [] );
  const [ dataLoaded, setDataLoaded ] = useState( false );

  const headerLabels = [ "", "", "Category", "Amount", "Date", "", "" ];

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
    <div className="ExistingTransactionData">
      { !dataLoaded ? (
        <tr><td id="loading">Loading...</td></tr>
      ) : rows.length === 0 ? (
        <tr><td>Create Your Transaction Below</td></tr>
      ) : (
        <>
              <DataTable rows={ rows } sendTo="transaction" headerLabels={ headerLabels } />
        </>
      )
      }
    </div >
  );
};