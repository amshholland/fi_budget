import Budget from "../model/budget";
import { DeleteRowModal } from "./DeleteRowModal";
import { Modal } from "react-bootstrap";
import { useState } from "react";

interface Props {
  rows: Budget[];
}

export function DeleteBudgetRowButton( { rows }: Props ) {
  const [ deleteRows, setDeleteRows ] = useState<Budget[]>( rows );

  const openConfirmDeletionModal = ( rows: Budget[] ) => setDeleteRows( rows );
  const closeConfirmDeletionModal = () => setDeleteRows( [] );

  return (
    <>
      <button className='hiddenButton' onClick={ () => openConfirmDeletionModal( deleteRows ) } >
      <img className="deleteIcon" src={ process.env.PUBLIC_URL + '/delete_icon.png' } />
      </button>

      <Modal
        show={ deleteRows.length !== 0 }
        className="mymodal"
        centered
      >
        { deleteRows.length !== 0 && (
          <DeleteRowModal rows={ deleteRows } handleClose={ closeConfirmDeletionModal } />
        ) }
      </Modal>
    </>
      );
};