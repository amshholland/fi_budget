import './Tables.css';
import './DataTable.css'

import { bulkDeleteBudgetLineItems, handleDelete } from "../../utils/EditBudget";

import Budget from "../../model/budget";
import { DeleteRowModal } from "../DeleteRowModal";
import { EditRowModal } from '../EditRowModal';
import Transaction from '../../model/transaction';
import { useState } from "react";
import { DataRow } from './DataRow';

interface Props {
  rows: Budget[] | Transaction[];
  headerLabels: string[];
  sendTo: string;
}


export function DataTable( { rows, headerLabels, sendTo }: Props ) {
  const [ editableRow, setEditableRow ] = useState<Budget | Transaction | null>( null );
  const [ deleteRows, setDeleteRows ] = useState<Budget[] | Transaction[] | []>( [] );
  const [ deleteRow, setDeleteRow ] = useState<Budget[] | Transaction[] | []>( [] );

  const openEditModal = ( row: Budget | Transaction ) => setEditableRow( row );
  const closeEditModal = () => setEditableRow( null );

  const openConfirmDeletionModal = ( row: any ) => setDeleteRow( prev => [ ...prev, row ] );
  const closeConfirmDeletionModal = () => setDeleteRow( [] );

  const handleAddToDelete = ( row: any ) => {
    console.log( row );
    const tempDeleteRows = [ ...deleteRows, row ];
    setDeleteRows( tempDeleteRows );

  };

  return (
    <div className="DataTable">

      <div className="deleteButtonModal">
        { deleteRows.length !== 0 && (
          <button className='hiddenButton' onClick={ () => bulkDeleteBudgetLineItems( deleteRows ) }><img className='deleteIcon' src={ process.env.PUBLIC_URL + '/delete_icon.png' } /></button>
        ) }
      </div>


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
            <DataRow row={ rows[ idx ] } sendTo={ sendTo } />
            <td className='centeredCell'>
              <button className='hiddenButton' onClick={ () => openEditModal( row ) }>
                <img className="editIcon" src={ process.env.PUBLIC_URL + '/edit_icon.png' } />
              </button>
            </td>
            <td className='centeredCell'>
              <button className='hiddenButton' onClick={ () => openConfirmDeletionModal( row ) } >
                <img className="deleteIcon" src={ process.env.PUBLIC_URL + '/delete_icon.png' } />
              </button>
            </td>
              { deleteRow.length !== 0 && (
                <DeleteRowModal rows={ deleteRow! } sendTo={ sendTo } handleClose={ closeConfirmDeletionModal } />
            ) }
            { editableRow !== null && (
            <EditRowModal row={ editableRow } handleClose={ closeEditModal } />
          ) }
          </tr>
        ) ) }

        </tbody>
      </table>
    </div>
  );
}