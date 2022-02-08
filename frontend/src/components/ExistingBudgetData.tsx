import './Tables.css';

import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import Budget from '../model/budget';
import { TableBody } from './Table/TableBody';
import { TableHeader } from './Table/TableHeader';
import { getBudgets } from '../service/Budget';

export function ExistingBudgetData() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState<Budget[]>( [] );
  const [ dataLoaded, setDataLoaded ] = useState( false );

  const rowLabels = [ "Type", "Category", "Amount", "Date", "", "" ];

  useEffect( () => {
    loadBudgetData();
  }, [] );

  function loadBudgetData() {
    if ( userFromDb ) {
      getBudgets( userFromDb._id! ).then( ( budget ) => {
        setRows( budget );
        setDataLoaded( true );
      } );
    }
  }

  return (
    <table className="ExistingBudgetData">
      { !dataLoaded ? (
        <tr><td id="loading">Loading...</td></tr>
      ) : rows.length === 0 ? (
        <tr><td>Create Your Budget Below</td></tr>
      ) : (
        <>
              <TableHeader headerLabels={ rowLabels } />
              <TableBody rows={ rows } />
            </>
      )
      }
    </table >
  );
};