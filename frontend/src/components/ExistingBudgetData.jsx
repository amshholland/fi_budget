import './BudgetTable.css';

import { addBudgets, getBudgets } from '../service/Budget';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import Budget from '../model/budget';

export function ExistingBudgetData() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState( [] );
  const [ dataLoaded, setDataLoaded ] = useState( false );
  const fieldNames = [ "accountId", "categoryType", "category", "amount", "date", "note" ];

  useEffect( () => {
    loadBudgetData();
  }, [] );

  function loadBudgetData() {
    if ( userFromDb ) {
      getBudgets( userFromDb?._id ).then( ( budget ) => {
        setRows( budget );
        setDataLoaded( true );
      } );
    }
  }

  return (
    <div>
      <tbody>
        { !dataLoaded ? (
          <p id="loading">Loading...</p>
        ) : rows.length === 0 ? (
          <p>Create Your Budget Below</p>
        ) : (
          <>
            { rows.map( ( column, idx ) => (
              <tr key={ idx } >
                { fieldNames.map( ( column, index ) => (
                  <td key={ index }>
                    { rows[ idx ][ column ] }
                  </td>
                ) ) }
              </tr>
            ) ) }
          </>
        ) }
      </tbody>
    </div>
  );
};