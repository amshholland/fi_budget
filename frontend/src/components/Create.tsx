import './Create.css';

import { addBudgets, getBudgets } from '../service/Budget';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import Budget from '../model/budget';

export function Create() {
  const { user, userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState<Budget[]>( [] );
  const [ row, setRow ] = useState<Budget>();
  const [ category, setCategory ] = useState( '' );
  const [ amount, setAmount ] = useState( 0 );
  const [ date, setDate ] = useState( new Date().toLocaleDateString() );
  const [ accountId, setAccountId ] = useState( '' );
  const [ type, setType ] = useState( '' );
  const [ note, setNote ] = useState( '' );

  useEffect( () => {
    loadExistingRowsFromBudget();
  }, [] );

  function loadExistingRowsFromBudget() {
    if ( userFromDb ) {
      console.log( `userFromDb ${ userFromDb._id! }` );
      getBudgets( userFromDb?._id! ).then( ( budget ) => {
        setRows( budget );
      } );
    }
  }

  const handleAddRow = () => {
    const row = {
      category: category,
      amount: amount,
      date: date,
      type: type,
      accountId: accountId,
      note: note,
    };
    let addRow = [ ...rows, row ];
    setRows( addRow );
  };

  const handleRemoveRow = () => {
    setRows( rows.slice( 0, -1 ) );
  };

  const handleRemoveSpecificRow = ( index: number ) => () => {
    setRows( rows.splice( index, 1 ) );
  };

  const handleSubmit = ( e: { preventDefault: () => void; } ) => {
    const bodyFormData = new FormData();
    e.preventDefault();
    if ( rows ) {
      rows.forEach( ( row ) => {
        addBudgets( row );
      } );
    }
    console.log( `Form submitted, ${ userFromDb?._id }` );
  }

  return (
    <div className="Create">
      <h1 className="h1">Create Your Budget</h1>
      {/* <h2>Customize your budget with categories and types based on your personal preferances.</h2>
      <p>
        The amounts added now are estimates.<br />
        The categories created will be available each month. You'll be able to modify the estimated amounts and due dates if
        necessary.<br />
        You will also be able add categories as needed but remember to keep them as consistent as possible for trend and goal achievment purposes.</p> */}
      <form onSubmit={ handleSubmit } className="budget">
        <table className="table table-striped" id="transactionTable">
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            { rows.map( ( row, index ) => (
              <tr>
                <input type="hidden" name="account" id="account" value={ userFromDb?._id } onChange={ ( e ) => setAccountId( e.target.value ) } />
                <td>
                  <select className="type" onChange={ ( e ) => setType( e.target.value ) } >
                    <option value="Income">Income</option>
                    <option value="Bill">Bill</option>
                    <option value="Expense">Expense</option>
                  </select>
                </td>
                <td><input type="text" name="category" id="category" className="category"
                  placeholder="Income Category" value={ category } onChange={ ( e ) => setCategory( e.target.value ) } />
                </td>
                <td className="amtContainer"><>$</><input type="text" className="amount" name="amount" id="amount"
                  placeholder="0.00" />
                </td>
                <td><input type="date" name="date" id="date" className="date" value={ date } onChange={ ( e ) => setDate( e.target.value ) } /></td>
              </tr>
            ) ) }
          </tbody>
        </table>
        <div className="buttons">
          <button onClick={ handleAddRow } >
            Add Row
          </button>
          <button onClick={ handleRemoveRow }>
            Delete Last Row
          </button>
        </div>
        <button type="submit">Submit</button>
      </form >
    </div >
  );
};