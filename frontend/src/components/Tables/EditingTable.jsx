import './Tables.css';

import { addBudgetForAccount, deleteBudgetByBudgetId, editExistingBudget } from '../../service/Budget';
import { useContext, useState } from 'react';

import { AuthContext } from "../../context/auth-context";

export function EditingTable() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState( [ {} ] );
  const headerLabels = [ "Type", "Category", "Amount", "Date", "" ];

  const handleAddRow = () => {
    const item = {};
    setRows( [ ...rows, item ] );
  };

  const handleSubmit = () => {
    if ( rows.length != 0 ) {
      addBudgetForAccount( rows );
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
    Object.assign( tempObj, { "budgetMonth": "02" } );
    Object.assign( tempObj, rows[ index ] );

    tempObj[ column ] = value;
    tempRows[ index ] = tempObj;

    setRows( tempRows );
  };


  return (
    <div className="EditingTable">
      <table className="Table">
        <thead className="TableHeader">
          <tr className="row">
            { headerLabels.map( ( column, index ) => (
              <th className="text-center" key={ index }>
                { column }
              </th>
            ) ) }
          </tr>
        </thead>
        <tbody className='TableBody' >
          { rows.map( ( item, idx ) => (
            <tr className="row" key={ idx } onChange={ ( e ) => updateState( e ) }>
              <td className='centeredCell'>
                <select column="categoryType" className="select" value={ rows[ idx ][ "categoryType" ] } index={ idx } >
                  <option value="none" selected disabled hidden>Select</option>
                  <option value="Income">Income</option>
                  <option value="Bill">Bill</option>
                  <option value="Expense">Expense</option>
                </select>
              </td>
              <td>
                <input type="text" column="category" className="category" value={ rows[ idx ][ "category" ] } index={ idx } />
              </td>
              <td>
                <><>$</><input type="number" column="amount" className="amount" value={ rows[ idx ][ "amount" ] } index={ idx } min="0.01" step="0.01" placeholder="0.00" /></>
              </td>
              <td>
                <input type="date" column="date" className="date" value={ rows[ idx ][ "date" ] } index={ idx } />
              </td>
              <td>
                <button
                  className='hiddenButton'
                  onClick={ () => handleRemoveSpecificRow( idx ) }>
                  <img className="removeIcon" src={ process.env.PUBLIC_URL + '/remove_icon.png' } />
                </button>
              </td>
            </tr>
          ) ) }
        </tbody>
      </table>

      <div className='buttonGroupHorizontal'>
        <button className="hiddenButton" onClick={ handleAddRow } name="submit" alt="Add Row Button">
          <img className="addIcon" src={ process.env.PUBLIC_URL + '/add_icon.png' } />
        </button>

        <button className="submitButton" onClick={ handleSubmit } >
          Save
        </button>
      </div>
    </div>
  );
};
