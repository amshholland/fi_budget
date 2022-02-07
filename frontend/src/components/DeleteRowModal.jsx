import { deleteBudgetItem } from '../service/Budget';

export function DeleteRowModal( { row, handleClose } ) {
  const handleDelete = ( transactionId ) => {
    deleteBudgetItem( transactionId );
    // alert( `${ row.category } deleted` );
    // handleClose();
  };

  return (
    <div className="showHideClassName" >
      <button onClick={ handleClose }>x</button>
      <h3>Remove your { row.category } { row.categoryType } budget of ${ row.amount } from this month's budget?</h3>
      <button
        onClick={ handleDelete( row.transactionId ) }
        className="btn btn-success float-right"
      ><img src={ process.env.PUBLIC_URL + '/save_icon.png' } /></button>
    </div >
  );
};