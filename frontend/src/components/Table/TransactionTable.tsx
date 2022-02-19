import { EditRowModal } from '../EditRowModal';
import { Modal } from 'react-bootstrap';
import Transaction from "../../model/budget";
import { useState } from "react";

interface Props {
  rows: Transaction[];
}

export function TransactionTable( { rows }: Props ) {
  const [ editableRow, setEditableRow ] = useState<Transaction | null>( null );
  const [ deleteRows, setDeleteRows ] = useState<Transaction[]>( [] );

  const openEditModal = ( row: Transaction ) => setEditableRow( row );
  const closeEditModal = () => setEditableRow( null );

  const handleAddToDelete = ( row: Transaction ) => {
    const tempDeleteRows = [ ...deleteRows, row ];
    setDeleteRows( tempDeleteRows );
  };

  return (
    <tbody>
      { rows.map( ( row, idx ) => (
        <tr key={ idx }>
          <td><input type="checkbox" value={ row.id } onClick={ () => handleAddToDelete( row ) } /></td>
          <td>{ row.categoryType }</td>
          <td>{ row.category }</td>
          <td>{ row.amount }</td>
          <td>{ row.date }</td>
          <td><button className='hiddenButton' onClick={ () => openEditModal( row ) }>
            <img className="editIcon" src={ process.env.PUBLIC_URL + '/edit_icon.png' } />
          </button>
            {/* <DeleteTransactionRowButton rows={ deleteRows! } /> */ }
          </td>
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
        {/* <button className='hiddenButton' onClick={ () => bulkDeleteTransactionLineItems( deleteRows ) }><img className='deleteIcon' src={ process.env.PUBLIC_URL + '/delete_icon.png' } /></button> */ }
      </Modal>
    </tbody>
  );
}