import './BudgetTable.css';

import { ChangeEvent, useContext, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import Budget from '../model/budget';
import { addBudgets } from '../service/Budget';

export function AddToBudget() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState( [ {} ] );
  const fieldNames = [ "accountId", "categoryType", "category", "amount", "date", "note" ];
  const inputTypes = [ "text", "text", "text", "number", "date", "text" ];

  const handleAddRow = () => {
    const item = {};
    setRows( [ ...rows, item ] );
  };

  const handleSubmit = () => {
    if ( !validateRowData ) {
      throw new Error( 'Invalid request' );
    }
    addBudgets( rows );
    console.log( rows );
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

    const tempRows = [ ...rows ]; // avoid direct state mutation
    console.log( `tempRows: ${ tempRows }` );
    const tempObj = rows[ index ]; // copy state object at index to a temporary object
    tempObj[ column ] = value; // modify temporary object

    // return object to rows` clone
    tempRows[ index ] = tempObj;
    setRows( tempRows ); // update state
  };

  return (
    <div>
      { rows.map( ( item, idx ) => (
        <tr key={ idx }>
          <input type="hidden" name="account" id="account" value={ rows[ idx ][ fieldNames[ 0 ] ] } onChange={ ( e ) => setAccountId( userFromDb?._id ) } />
          {/* <td>
                      <select className="type" onChange={ ( e ) => updateState( e.target.value ) } >
                        <option value="Income">Income</option>
                        <option value="Bill">Bill</option>
                        <option value="Expense">Expense</option>
                      </select>
                    </td>
                    <td><input type="text" name="category" id="category" className="category"
                      placeholder="Income Category" value={ rows[ idx ][ fieldNames[ 1 ] ] } onChange={ ( e ) => setCategory( e.target.value ) } />
                    </td>
                    <td className="amtContainer"><>$</><input type="number" className="amount" name="amount" id="amount"
                      placeholder="0.00" value={ rows[ idx ][ fieldNames[ 3 ] ] } onChange={ ( e ) => setAmount( e.target.value ) } />
                    </td>
                    <td><input type="date" name="date" id="date" className="date" value={ rows[ idx ][ fieldNames[ 4 ] ] } onChange={ ( e ) => setDate( e.target.value ) } /></td>
                    <td><input type="note" name="note" id="note" className="note" value={ rows[ idx ][ fieldNames[ 5 ] ] } onChange={ ( e ) => setNote( e.target.value ) } /></td> */}

          { fieldNames.map( ( column, index ) => (
            <td key={ index }>
              <input
                type="text"
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
