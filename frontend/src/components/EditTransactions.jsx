import './Tables/Tables.css';

import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import { addTransactionsForAccount } from '../service/Transaction';
import { getBudgetCategoriesForAccount } from '../service/Budget';

export function EditTransactions() {
  const { userFromDb } = useContext( AuthContext );
  const [ categories, setCategories ] = useState( [] )
  const [ rows, setRows ] = useState( [ {} ] );
  const headerLabels = [ "Category", "Transaction", "Amount", "Date", "" ];

  useEffect( () => {
    getBudgetCategories();
  }, [] );

  const handleAddRow = () => {
    const item = {};
    setRows( [ ...rows, item ] );
  };

  function getBudgetCategories() {
    if ( userFromDb ) {
      getBudgetCategoriesForAccount( userFromDb._id ).then( ( budget ) => {
        setCategories( budget );
        console.log( categories );
      } );
    }
  }

  const handleSubmit = () => {
    if ( rows.length != 0 ) {
      addTransactionsForAccount( rows );
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
    Object.assign( tempObj, { "budgetMonth": "Feb" } );
    Object.assign( tempObj, rows[ index ] );
    tempObj[ column ] = value;
    tempRows[ index ] = tempObj;
    console.log( tempRows[ index ] )

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
          <tr key={ idx } onChange={ ( e ) => updateState( e ) }>
            <td>
              <select className="category" column="category" value={ rows[ idx ][ "category" ] } index={ idx } >
                <option value="none" selected disabled hidden>Select</option>
                { categories.map( ( category, index ) => (
                  <option key={ index } value={ category.category }>{ category.category }</option>
                ) ) }
              </select>
            </td>
            <td>
              <><>$</><input type="number" column="amount" className="amount" value={ rows[ idx ][ "amount" ] } index={ idx } min="0.01" step="0.01" placeholder="0.00" /></>
            </td>
            <td>
              <input type="date" className="date" column="date" value={ rows[ idx ][ "date" ] } index={ idx } />
            </td>
            <td><input type="hidden" value="" /></td>
            <td>
              <button className="hiddenButton" onClick={ () => handleRemoveSpecificRow( idx ) }>
                <img className="removeIcon" src={ process.env.PUBLIC_URL + '/remove_icon.png' } />
              </button>
            </td>
          </tr>
        ) ) }
        </tbody>
      </table>

      <div className='buttonGroupHorizontal'>
        <button className="hiddenButton" onClick={ handleAddRow } alt="Add Row Button">
          <img className="addIcon" src={ process.env.PUBLIC_URL + '/add_icon.png' } />
        </button>

        <button className="submitButton" onClick={ handleSubmit } >
          Save
        </button>
      </div>
    </div>
  );
};
