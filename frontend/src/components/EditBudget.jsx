import './Tables.css';

import { addBudgets, deleteBudgetItem, editBudgetLineItem } from '../service/Budget';
import { useContext, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import { TableHeader } from './Table/TableHeader';
import { handleAddNewBudget } from '../utils/EditBudget';

export function EditBudget() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState( [ {} ] );
  const columnLabels = [ "Type", "Category", "Amount", "Date", "" ];

  const handleAddRow = () => {
    const item = {};
    setRows( [ ...rows, item ] );
  };

  const handleSubmit = () => {
    if ( rows.length != 0 ) {
      addBudgets( rows );
    }
    console.log( `Form submitted, ${ userFromDb?._id }` );
  };

  const handleRemoveSpecificRow = ( idx ) => {
    const tempRows = [ ...rows ];
    tempRows.splice( idx, 1 );
    setRows( tempRows );
  };

  const updateState = ( e ) => {
    let column = e.target.attributes.column.value;
    let index = e.target.attributes.index.value;
    let value = e.target.value;

    const tempRows = [ ...rows ];

    let tempObj = {};
    Object.assign( tempObj, { "accountId": userFromDb?._id } );
    Object.assign( tempObj, rows[ index ] );

    tempObj[ column ] = value;

    console.log( tempRows[ index ] ); //********* */
    tempRows[ index ] = tempObj;

    setRows( tempRows );
  };


  return (
    <table className="EditBudget">
      <TableHeader headerLabels={ columnLabels } />
      <tbody className='AddToBudget' >
        { rows.map( ( item, idx ) => (
          <tr key={ idx } onChange={ ( e ) => updateState( e ) }>
            <td>
              <select className="form-control" column="categoryType" value={ rows[ idx ][ "categoryType" ] } index={ idx } >
                <option value="none" selected disabled hidden>Select</option>
                <option value="Income">Income</option>
                <option value="Bill">Bill</option>
                <option value="Expense">Expense</option>
              </select>
            </td>
            <td>
              <input type="text" className="form-control" column="category" value={ rows[ idx ][ "category" ] } index={ idx } />
            </td>
            <td>
              <><>$</><input type="number" className="form-control" column="amount" value={ rows[ idx ][ "amount" ] } index={ idx } min="0.01" step="0.01" placeholder="0.00" /></>
            </td>
            <td>
              <input type="date" className="form-control" column="date" value={ rows[ idx ][ "date" ] } index={ idx } />
            </td>
            <td>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={ () => handleRemoveSpecificRow( idx ) }>
                Remove
              </button>
            </td>
          </tr>
        ) ) }
        <tr>
          <td>
            <button onClick={ handleAddRow } className="btn btn-primary" name="submit" alt="Submit Button">
              Add Row
            </button>
          </td>
          <td>
            <button onClick={ handleSubmit } className="btn btn-success float-right">
              Save Results
            </button>
          </td>
        </tr>
      </tbody>
    </table >
  );
};
