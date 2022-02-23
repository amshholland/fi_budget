import { SetStateAction, useState } from "react";

import Budget from "../model/budget";
import Transaction from "../model/transaction";

interface Props {
  rows: Budget[] | Transaction[];
  headerLabels: string[];
}

export function DeleteBudgetRowButton( { rows, headerLabels }: Props ) {
  const [ deleteRow, setDeleteRow ] = useState<any>( rows );
  console.log( deleteRow );
  const openConfirmDeletionModal = ( row: Budget | Transaction ) => setDeleteRow( rows );

  return (
    <>
      <button className='hiddenButton' onClick={ () => openConfirmDeletionModal( deleteRow! ) } >
      <img className="deleteIcon" src={ process.env.PUBLIC_URL + '/delete_icon.png' } />
      </button>
    </>
      );
};