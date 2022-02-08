import Budget from "../../model/budget";
import { DeleteBudgetRowButton } from '../DeleteBudgetRowButton';
import { EditRowModal } from '../EditRowModal';
import { Modal } from 'react-bootstrap';
import { bulkDeleteBudgetLineItems } from "../../utils/EditBudget";
import { useState } from "react";

interface Props {
  rows: Budget[];
}

export function TableBody( { rows }: Props ) {
  const [ editableRow, setEditableRow ] = useState<Budget | null>( null );
  const [ deleteRows, setDeleteRows ] = useState<Budget[]>( [] );

  const openEditModal = ( row: Budget ) => setEditableRow( row );
  const closeEditModal = () => setEditableRow( null );

  const handleAddToDelete = ( row: Budget ) => {
    const tempDeleteRows = [ ...deleteRows, row ];
    setDeleteRows( tempDeleteRows );
  };

  return (
    <tbody>
      { rows.map( ( row, idx ) => (
        <tr key={ idx }>
          <td><input type="checkbox" value={ row.transactionId } onClick={ () => handleAddToDelete( row ) } /></td>
          <td>{ row.categoryType }</td>
          <td>{ row.category }</td>
          <td>{ row.amount }</td>
          <td>{ row.date }</td>
          <td><button className='hiddenButton' onClick={ () => openEditModal( row ) }>
            <img className="editIcon" src={ process.env.PUBLIC_URL + '/edit_icon.png' } />
          </button>
            <DeleteBudgetRowButton rows={ deleteRows! } /></td>
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
  );
}