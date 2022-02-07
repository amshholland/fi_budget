import './Tables.css';

import { useContext, useEffect, useState } from 'react';

import { AuthContext } from "../context/auth-context";
import Budget from '../model/budget';
import { DeleteRowModal } from './DeleteRowModal';
import { EditRowModal } from './EditRowModal';
import { Modal } from "react-bootstrap";
import { bulkDeleteBudgetLineItems } from '../utils/EditBudget';
import { getBudgets } from '../service/Budget';

export function ExistingBudgetData() {
  const { userFromDb } = useContext( AuthContext );
  const [ rows, setRows ] = useState<Budget[]>( [] );
  const [ dataLoaded, setDataLoaded ] = useState( false );
  const [ editableRow, setEditableRow ] = useState<Budget | null>( null );
  const [ deleteRow, setDeleteRow ] = useState<Budget | null>( null );
  const [ deleteRows, setDeleteRows ] = useState<number[]>( [] );

  const openEditModal = ( row: Budget ) => setEditableRow( row );
  const closeEditModal = () => setEditableRow( null );

  const openConfirmDeletionModal = ( row: Budget ) => setDeleteRow( row );
  const closeConfirmDeletionModal = () => setDeleteRow( null );

  const closeBulkDeletionModal = () => setDeleteRows( [] );

  const rowLabels = [ "Type", "Category", "Amount", "Date", "", "" ];

  useEffect( () => {
    loadBudgetData();
  }, [] );

  function loadBudgetData() {
    if ( userFromDb ) {
      getBudgets( userFromDb._id! ).then( ( budget ) => {
        setRows( budget );
        setDataLoaded( true );
      } );
    }
  }

  const handleAddForBulkDelete = ( transactionId: number ) => {
    const tempDeleteRows = [ ...deleteRows ];
    tempDeleteRows.push( transactionId );
    console.log( tempDeleteRows );
    setDeleteRows( tempDeleteRows );
  };

  return (
    <table className="ExistingBudgetData">
      { !dataLoaded ? (
        <tr><td id="loading">Loading...</td></tr>
      ) : rows.length === 0 ? (
        <tr><td>Create Your Budget Below</td></tr>
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
                <td><input type="checkbox" value={ row.transactionId } onClick={ () => handleAddForBulkDelete( row.transactionId! ) } /></td>
                <td>{ row.categoryType }</td>
                <td>{ row.category }</td>
                <td>{ row.amount }</td>
                <td>{ row.date }</td>
                <td><button className='hiddenButton' onClick={ () => openEditModal( row ) }>
                  <img className="editIcon" src={ process.env.PUBLIC_URL + '/edit_icon.png' } />
                </button>
                  <button className='hiddenButton' onClick={ () => openConfirmDeletionModal( row ) } > <img className="deleteIcon" src={ process.env.PUBLIC_URL + '/delete_icon.png' } /></button></td>
              </tr>
            ) ) }
            <Modal
              show={ editableRow !== null }
              className="mymodal"
              centered
            >
              { editableRow !== null && (
                <EditRowModal row={ editableRow } handleClose={ closeEditModal } />
              ) }
            </Modal>
            <Modal
              show={ deleteRow !== null }
              className="mymodal"
              centered
            >
              { deleteRow !== null && (
                <DeleteRowModal row={ deleteRow } handleClose={ closeConfirmDeletionModal } />
              ) }
            </Modal>
            <Modal show={ deleteRows.length !== 0 } className="bulkDeleteModal">
              <button className='hiddenButton' onClick={ () => bulkDeleteBudgetLineItems( deleteRows ) }><img className='deleteIcon' src={ process.env.PUBLIC_URL + '/delete_icon.png' } /></button>
            </Modal>
          </tbody>
        </>
      )
      }
    </table >
  );
};