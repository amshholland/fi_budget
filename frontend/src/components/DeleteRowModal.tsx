import Budget from '../model/budget';
import { BudgetTable } from './Table/BudgetTable';
import Transaction from '../model/transaction';
import { handleDelete } from '../utils/EditBudget';

interface Props {
  row: Budget | Transaction;
  handleClose: () => void;
}

export function DeleteRowModal( { row, handleClose }: Props ) {

    // alert( `${ row.category } deleted` );
    // handleClose();


  return (
    <div className="showHideClassName" >
      <button onClick={ handleClose }>x</button>
      <h4>Are you sure you want to remove the following row(s)?</h4>
      {/* <BudgetTable row={ row } /> */ }
      <button
        onClick={ () => handleDelete( row.id! ) }
        className="btn btn-success float-right"
      ><img src={ process.env.PUBLIC_URL + '/save_icon.png' } /></button>
    </div >
  );
};