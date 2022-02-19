import './Tables/Tables.css';

import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import Budget from '../model/budget';
import { DataTable } from './Tables/DataTable';
import { getBudgetsForAccount } from '../service/Budget';

export function BudgetData() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState<Budget[]>( [] );
  const [ dataLoaded, setDataLoaded ] = useState( false );

  const headerLabels = [ "", "Type", "Category", "Amount", "Date", "" ];

  useEffect( () => {
    loadBudgetData();
  }, [] );

  function loadBudgetData() {
    if ( userFromDb ) {
      getBudgetsForAccount( userFromDb._id! ).then( ( budget ) => {
        setRows( budget );
        setDataLoaded( true );
      } );
    }
  }

  return (
    <div className="ExistingBudgetData">
      { !dataLoaded ? (
        <tr><td id="loading">Loading...</td></tr>
      ) : rows.length === 0 ? (
        <tr><td>Create Your Budget Below</td></tr>
      ) : (
            <>
              <DataTable rows={ rows } headerLabels={ headerLabels } />
            </>
      )
      }
    </div >
  );
};