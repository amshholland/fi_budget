import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/auth-context";
import Transaction from '../model/transaction';
import { getTransactionsForAccount } from '../service/Transaction';
import { DataTable } from './Tables/DataTable';
import './Tables/Tables.css';



export function TransactionData() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState<Transaction[]>( [] );
  const [ dataLoaded, setDataLoaded ] = useState( false );

  const headerLabels = [ "", "Category", "Transaction", "Amount", "Date", "" ];

  useEffect( () => {
    loadTransactionData();
  }, [] );

  function loadTransactionData() {
    if ( userFromDb ) {
      getTransactionsForAccount( userFromDb._id! ).then( ( transaction ) => {
        setRows( transaction );
        console.log( rows )
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