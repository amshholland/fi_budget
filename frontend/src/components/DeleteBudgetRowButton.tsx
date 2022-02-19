import { SetStateAction, useState } from "react";

import Budget from "../model/budget";
import { DeleteRowModal } from "./DeleteRowModal";
import { Modal } from "react-bootstrap";
import Transaction from "../model/transaction";

interface Props {
  row: Budget[] | Transaction[];
}

export function DeleteBudgetRowButton( { row }: Props ) {
  const [ deleteRow, setDeleteRow ] = useState<any>( row );
  console.log( deleteRow );
  const openConfirmDeletionModal = ( row: Budget | Transaction ) => setDeleteRow( row );
  const closeConfirmDeletionModal = () => setDeleteRow( null );

  return (
    <>
      <button className='hiddenButton' onClick={ () => openConfirmDeletionModal( deleteRow! ) } >
      <img className="deleteIcon" src={ process.env.PUBLIC_URL + '/delete_icon.png' } />
      </button>

      <Modal
        show={ deleteRow.length !== 0 }
        className="mymodal"
        centered
      >
        { deleteRow.length !== 0 && (
          <DeleteRowModal row={ deleteRow } handleClose={ closeConfirmDeletionModal } />
        ) }
      </Modal>
    </>
      );
};