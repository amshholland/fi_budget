import Budget from "../model/budget";
import { useState } from "react";

interface Props {
  row: Budget;
  handleClose: () => void;
}


export function DeleteBudgetRowButton( row: Budget ) {
  const openConfirmDeletionModal = ( row: Budget ) => setDeleteRow( row );

  return (
    <button className='hiddenButton' onClick={ () => openConfirmDeletionModal( row ) >
      <img className="deleteIcon" src={ process.env.PUBLIC_URL + '/delete_icon.png' } />
    </ button>

      );
};