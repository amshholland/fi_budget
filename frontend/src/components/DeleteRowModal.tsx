import Budget from '../model/budget';
import { BudgetTable } from './Table/BudgetTable';
import { deleteBudgetByBudgetId } from '../service/Budget';

interface Props {
  rows: Budget[];
  handleClose: () => void;
}

export function DeleteRowModal( { rows, handleClose }: Props ) {
  const handleDelete = ( rows: Budget[] ) => {
    rows.map( ( row ) => deleteBudgetByBudgetId( row.budgetId! ) )
      ;
    // alert( `${ row.category } deleted` );
    // handleClose();
  };

  return (
    <div className="showHideClassName" >
      <button onClick={ handleClose }>x</button>
      <h4>Are you sure you want to remove the following row(s)?</h4>
      <BudgetTable rows={ rows } />
      <button
        onClick={ () => handleDelete( rows ) }
        className="btn btn-success float-right"
      ><img src={ process.env.PUBLIC_URL + '/save_icon.png' } /></button>
    </div >
  );
};