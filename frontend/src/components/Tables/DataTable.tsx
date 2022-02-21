import './Tables.css';

import { bulkDeleteBudgetLineItems, handleDelete } from "../../utils/EditBudget";

import Budget from "../../model/budget";
import { DeleteRowModal } from "../DeleteRowModal";
import { EditRowModal } from '../EditRowModal';
import { Modal } from "react-bootstrap";
import Transaction from '../../model/transaction';
import { useState } from "react";

interface Props {
  rows: Budget[] | Transaction[];
  headerLabels: string[];
}


export function DataTable( { rows, headerLabels }: Props ) {
  const [ editableRow, setEditableRow ] = useState<Budget | Transaction | null>( null );
  const [ deleteRow, setDeleteRow ] = useState<Budget | Transaction | null>( null );
  const [ deleteRows, setDeleteRows ] = useState<Budget[] | Transaction[] | []>( [] );

  const openEditModal = ( row: Budget | Transaction ) => setEditableRow( row );
  const closeEditModal = () => setEditableRow( null );

  const openConfirmDeletionModal = ( row: Budget | Transaction ) => setDeleteRow( row );
  const closeConfirmDeletionModal = () => setDeleteRows( [] );

  const handleAddToDelete = ( row: any ) => {
    console.log( row );
    const tempDeleteRows = [ ...deleteRows, row ];
    setDeleteRows( tempDeleteRows );

  };

  return (
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

      <tbody className="TableBody">
        { rows.map( ( row, idx ) => (
          <tr className="row" key={ idx }>
            <td className='centeredCell'><input type="checkbox" value={ row.id } onClick={ () => handleAddToDelete( row ) } /></td>
            <td>categoryType</td>
            <td>{ row.category }</td>
            <td>${ row.amount }</td>
            <td>{ row.date }</td>
            <td className='centeredCell'><button className='hiddenButton' onClick={ () => openEditModal( row ) }>
              <img className="editIcon" src={ process.env.PUBLIC_URL + '/edit_icon.png' } />
            </button>
            </td>
            <td className='centeredCell'>
              <button className='hiddenButton' onClick={ () => openConfirmDeletionModal( row ) } >
                <img className="deleteIcon" src={ process.env.PUBLIC_URL + '/delete_icon.png' } />
              </button>
            </td>
            <Modal
              show={ deleteRow !== null }
              className="mymodal"
              centered
            >
              { deleteRow !== null && (
                <DeleteRowModal row={ deleteRow! } handleClose={ closeConfirmDeletionModal } />
              ) }
            </Modal>
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

        <Modal show={ deleteRows.length !== 0 } className="mymodal">
          <button className='hiddenButton' onClick={ () => bulkDeleteBudgetLineItems( deleteRows ) }><img className='deleteIcon' src={ process.env.PUBLIC_URL + '/delete_icon.png' } /></button>
        </Modal>
      </tbody>
    </table>
  );
}