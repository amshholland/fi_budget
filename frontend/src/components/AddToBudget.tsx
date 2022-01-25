import './BudgetTable.css';

import { useContext, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import Budget from '../model/budget';
import { addBudgets } from '../service/Budget';

export function AddToBudget() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState<Budget[]>( [] );
  const [ row, setRow ] = useState<Budget>( {
    category: '',
    amount: '',
    date: '',
    categoryType: '',
    accountId: '',
    note: ''
  } );
  const [ category, setCategory ] = useState( '' );
  const [ amount, setAmount ] = useState( '' );
  const [ date, setDate ] = useState( new Date().toLocaleDateString() );
  const [ accountId, setAccountId ] = useState( '' );
  const [ categoryType, setCategoryType ] = useState( '' );
  const [ note, setNote ] = useState( '' );
  const [ index, setIndex ] = useState( 0 );

  const handleChange = () => {
    setIndex( index );
    setRow( {
      ...row,
      category: category,
      amount: amount,
      date: date,
      accountId: accountId,
      categoryType: categoryType,
    } );
    let newRow = [ ...rows, row ];
    setRows( newRow );
  };


  const handleAddRow = () => {
    setRow( {
      category: '',
      amount: '',
      date: '',
      categoryType: '',
      accountId: '',
      note: ''
    } );
    let addRow = [ ...rows, row ];
    setRows( addRow );
  };

  const handleRemoveRow = () => {
    setRows( rows.slice( 0, -1 ) );
  };

  const handleRemoveSpecificRow = ( category: string ) => () => {
    setRows( rows.splice( rows.findIndex( x => x.category === category ), 1 ) );
  };

  const handleSubmit = ( e: { preventDefault: () => void; } ) => {
    e.preventDefault();
    if ( rows ) {
      addBudgets( rows );
    }
    console.log( `Form submitted, ${ userFromDb?._id }` );
  };

  return (
    <div className="AddToBudget">
      <form onSubmit={ handleSubmit } className="budget">
        <tbody>

          { rows.map( ( row, index ) => (
            <tr key={ index }>
              <input type="hidden" name="account" id="account" value={ userFromDb?._id } onChange={ ( e ) => setAccountId( e.target.value ) } />
              <td>
                <select className="type" onChange={ ( e ) => setCategoryType( e.target.value ) } >
                  <option value="Income">Income</option>
                  <option value="Bill">Bill</option>
                  <option value="Expense">Expense</option>
                </select>
              </td>
              <td><input type="text" name="category" id="category" className="category"
                placeholder="Income Category" value={ category } onChange={ ( e ) => setCategory( e.target.value ) } />
              </td>
              <td className="amtContainer"><>$</><input type="number" className="amount" name="amount" id="amount"
                placeholder="0.00" value={ amount } onChange={ ( e ) => setAmount( e.target.value ) } />
              </td>
              <td><input type="date" name="date" id="date" className="date" value={ date } onChange={ ( e ) => setDate( e.target.value ) } /></td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={ handleRemoveSpecificRow( category ) }
                >
                  Remove
                </button>
              </td>
            </tr>
          ) ) }
        </tbody>
        <div className="buttons">
          <button onClick={ handleAddRow } >
            Add Row
          </button>
          <button onClick={ handleRemoveRow }>
            Delete Last Row
          </button>
        </div>
      </form>
      <button type="submit">Submit</button>

    </div >
  );
};