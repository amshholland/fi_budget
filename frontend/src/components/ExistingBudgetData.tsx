import './BudgetTable.css';

import { addBudgets, getBudgets } from '../service/Budget';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import Budget from '../model/budget';

export function ExistingBudgetData() {
  const { userFromDb } = useContext( AuthContext );
  const [ data, setData ] = useState<Budget[]>( [] );
  const [ dataLoaded, setDataLoaded ] = useState( false );

  useEffect( () => {
    loadBudgetData();
  }, [] );

  function loadBudgetData() {
    if ( userFromDb ) {
      getBudgets( userFromDb?._id! ).then( ( budget ) => {
        setData( budget );
        setDataLoaded( true );
      } );
    }
  }

  return (
    <div className="ExistingBudgetData">
      <tbody>
        { !dataLoaded ? (
          <p id="loading">Loading...</p>
        ) : data.length === 0 ? (
          <p>Create Your Budget Below</p>
        ) : (
          <>
            { data.map( ( row, index ) => (
              <tr>
                <td className="categoryType"> { row.categoryType } </td>
                <td className="category">{ row.category }</td>
                <td className="amount">{ row.amount } </td>
                <td className="date">{ row.date }</td>
              </tr>
            ) ) }
          </>
        )
        }
      </tbody>
    </div>
  );
};