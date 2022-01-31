import './BudgetTable.css';

import { ChangeEvent, useContext, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import { addBudgets } from '../service/Budget';

export function AddToBudget() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState( [ {} ] );
  const fieldNames = [ "categoryType", "category", "amount", "date", "note" ];
  const inputTypes = [ "text", "text", "number", "date", "text" ];

  const handleAddRow = () => {
    const item = {};
    setRows( [ ...rows, item ] );
  };

  const handleSubmit = () => {
    if ( !validateRowData ) {
      throw new Error( 'Invalid request' );
    }
    addBudgets( rows );
    console.log( `Form submitted, ${ userFromDb?._id }` );
  };

  const handleRemoveSpecificRow = ( idx ) => {
    const tempRows = [ ...rows ];
    tempRows.splice( idx, 1 );
    setRows( tempRows );
  };

  function validateRowData( rows ) {
    return true;
  }

  const updateState = ( e ) => {
    let column = e.target.attributes.column.value;
    let index = e.target.attributes.index.value;
    let value = e.target.value;

    const tempRows = [ ...rows ];
    let tempObj = {};
    Object.assign( tempObj, { "accountId": userFromDb?._id } );
    Object.assign( tempObj, rows[ index ] );

    tempObj[ column ] = value;

    tempRows[ index ] = tempObj;
    setRows( tempRows );
    console.log( rows )
  };


  return (
    <div>
      { rows.map( ( item, idx ) => (
        <tr key={ idx }>
          { fieldNames.map( ( column, index ) => (
            <td key={ index }>
              <input
                type={ inputTypes[ index ] }
                column={ column }
                value={ rows[ idx ][ column ] }
                index={ idx }
                className="form-control"
                onChange={ ( e ) => updateState( e ) }
              />
            </td>
          ) ) }
          <td>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={ () => handleRemoveSpecificRow( idx ) }
            >
              Remove
            </button>
          </td>
        </tr>
      ) ) }
      <button onClick={ handleAddRow } className="btn btn-primary">
        Add Row
      </button>
      <button
        onClick={ handleSubmit }
        className="btn btn-success float-right"
      >
        Save Results
      </button>
    </div >
  );
};
