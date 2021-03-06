import Budget from '../model/budget';
import Transaction from '../model/transaction';
import { addBudgetForAccount, deleteBudgetByBudgetId } from '../service/Budget';


export const handleAddNewBudget = ( rows: Budget[] ) => {
  addBudgetForAccount( rows );
  console.log( `Form submitted` );
};

export const handleDelete = ( id: number ) => {
  deleteBudgetByBudgetId( id );
};

export const bulkDeleteBudgetLineItems = ( rows: Budget[] | Transaction[] ) => {
  rows.forEach( row => {
    deleteBudgetByBudgetId( row.id! );
  } );
};

// export const editExistingBudgetLineItem = ( row: Budget ) => {
//   editBudgetLineItem( row );
//   console.log( `Row updated` );
// };