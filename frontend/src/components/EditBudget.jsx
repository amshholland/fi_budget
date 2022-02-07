import './Tables.css';

import { ChangeEvent, useContext, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import { handleAddNewBudget } from '../utils/EditBudget';

export function EditBudget() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState( [ {} ] );
  const fieldNames = [ "categoryType", "category", "amount", "date" ];
  const inputTypes = [ "text", "text", "number", "date" ];
  const columnLabels = [ "Type", "Category", "Amount", "Date", "" ];

  const handleAddRow = () => {
    const item = {};
    setRows( [ ...rows, item ] );
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
    console.log( rows );
  };


  return (
    <table className="EditBudget">
      <thead >
        <tr>
          { columnLabels.map( ( column, index ) => (
            <th className="text-center" key={ index }>
              { column }
            </th>
          ) ) }
          <th />
        </tr>
      </thead>
      <tbody className='AddToBudget'>
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
        <tr>
          <td>
            <button onClick={ handleAddRow } className="btn btn-primary" name="submit" alt="Submit Button">
              Add Row
            </button>
          </td>
          <td>
            <button onClick={ handleAddNewBudget } className="btn btn-success float-right">
              Save Results
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
