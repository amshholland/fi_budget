import { addBudgetForAccount, deleteBudgetByBudgetId, editExistingBudget } from '../service/Budget';

import Budget from '../model/budget';
import Transaction from '../model/transaction';

export const handleAddNewBudget = ( rows: Budget[] ) => {
  addBudgetForAccount( rows );
  console.log( `Form submitted` );
};

export const handleDelete = ( id: number ) => {
  console.log( id );
  deleteBudgetByBudgetId( id );
  console.log( `Row deleted` );
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