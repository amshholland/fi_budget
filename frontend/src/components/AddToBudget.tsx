import './BudgetTable.css';

import { useContext, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import Budget from '../model/budget';
import { addBudgets } from '../service/Budget';

export function AddToBudget() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState( [ {} ] );
  const columnNames = [ "Type", "Category", "Amount", "Date", "Note" ];

  const handleAddRow = () => {
    const item = {};
    setRows( [ ...rows, item ] );
  };

  const handleSubmit = () => {
    if ( rows ) {
      addBudgets( rows );
    }
    console.log( `Form submitted, ${ userFromDb?._id }` );
  };

  const handleRemoveSpecificRow = ( idx: number ) => {
    const tempRows = [ ...rows ];
    tempRows.splice( idx, 1 );
    setRows( tempRows );
  };

  const updateState = ( e ) => {
    let column = e.target.attributes.column.value;
    let index = e.target.attributes.index.value;
    let value = e.target.value;

    const tempRows = [ ...rows ]; // avoid direct state mutation
    const tempObj = rows[ index ]; // copy state object at index to a temporary object
    tempObj[ column ] = value; // modify temporary object

    // return object to rows` clone
    tempRows[ index ] = tempObj;
    setRows( tempRows ); // update state
  };

  return (
    <div>
      <div className="container">
        <div className="row clearfix">
          <div className="col-md-12 column">
            <table className="table table-bordered table-hover" id="tab_logic">
              <thead>
                <tr>
                  <th className="text-center"> # </th>
                  { columnNames.map( ( column, index ) => (
                    <th className="text-center" key={ index }>
                      { column }
                    </th>
                  ) ) }
                  <th />
                </tr>
              </thead>
              <tbody>
                { rows.map( ( item, idx ) => (
                  <tr key={ idx }>
                    <td>{ idx + 1 }</td>
                    { columnNames.map( ( column, index ) => (
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
              </tbody>
            </table>
            <button onClick={ handleAddRow } className="btn btn-primary">
              Add Row
            </button>
            <button
              onClick={ handleSubmit }
              className="btn btn-success float-right"
            >
              Save Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
