import Budget from '../model/budget';
import { TableBody } from './Table/TableBody';
import { deleteBudgetItem } from '../service/Budget';

interface Props {
  rows: Budget[];
  handleClose: () => void;
}

export function DeleteRowModal( { rows, handleClose }: Props ) {
  const handleDelete = ( rows: Budget[] ) => {
    rows.map( ( row ) => deleteBudgetItem( row.transactionId! ) )
      ;
    // alert( `${ row.category } deleted` );
    // handleClose();
  };

  return (
    <div className="showHideClassName" >
      <button onClick={ handleClose }>x</button>
      <h4>Are you sure you want to remove the following row(s)?</h4>
      <TableBody rows={ rows } />
      <button
        onClick={ () => handleDelete( rows ) }
        className="btn btn-success float-right"
      ><img src={ process.env.PUBLIC_URL + '/save_icon.png' } /></button>
    </div >
  );
};