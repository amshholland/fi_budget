import './Tables.css';

import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import { EditRowModal } from './EditRowModal';
import { Modal } from "react-bootstrap";
import { getBudgets } from '../service/Budget';

export function ExistingBudgetData() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState( [] );
  const [ dataLoaded, setDataLoaded ] = useState( false );
  const [ editableRow, setEditableRow ] = useState( null );

  const openModal = ( row ) => setEditableRow( row );
  const closeModal = () => setEditableRow( null );

  const rowLabels = [ "Type", "Category", "Amount", "Date", "", "" ];

  useEffect( () => {
    loadBudgetData();
  }, [] );

  function loadBudgetData() {
    if ( userFromDb ) {
      getBudgets( userFromDb?._id ).then( ( budget ) => {
        setRows( budget );
        setDataLoaded( true );
      } );
    }
  }

  return (
    <table className="ExistingBudgetData">
      { !dataLoaded ? (
        <td id="loading">Loading...</td>
      ) : rows.length === 0 ? (
          <td>Create Your Budget Below</td>
        ) : (
          <>
              <thead className="TableHeader">
                <tr>
                  { rowLabels.map( ( row, index ) => (
                    <th className="text-center" key={ index }>
                      { row }
                    </th>
                  ) ) }
                  <th />
                </tr>
              </thead>
              <tbody className='ExistingBudgetData'>
                { rows.map( ( row, idx ) => (
                  <tr key={ idx }>
                    <td>{ row.categoryType }</td>
                    <td>{ row.category }</td>
                    <td>{ row.amount }</td>
                    <td>{ row.date }</td>
                    <button className='hiddenButton' onClick={ () => openModal( row ) }>
                      <img className="editIcon" src={ process.env.PUBLIC_URL + '/edit_icon.png' } />
                    </button>
                    <button className='hiddenButton'><img className="deleteIcon" src={ process.env.PUBLIC_URL + '/delete_icon.png' } /></button>
              </tr>
                ) ) }
                <Modal
                  show={ editableRow !== null }
                  className="mymodal"
                  centered
                >
                  { editableRow !== null && (
                    <EditRowModal row={ editableRow } handleClose={ closeModal } />
                  ) }
                </Modal>
              </tbody>
        </>
      ) }
    </table>
  );
};