import { addBudgetForAccount, deleteBudgetByBudgetId, editExistingBudget } from '../service/Budget';

import Budget from '../model/budget';

export const handleAddNewBudget = ( rows: Budget[] ) => {
  addBudgetForAccount( rows );
  console.log( `Form submitted` );
};

export const handleDelete = ( transactionId: number ) => {
  deleteBudgetByBudgetId( transactionId );
  console.log( `Row deleted` );
};

export const bulkDeleteBudgetLineItems = ( rows: Budget[] ) => {
  rows.forEach( row => {
    deleteBudgetByBudgetId( row.budgetId! );
  } );
};

// export const editExistingBudgetLineItem = ( row: Budget ) => {
//   editBudgetLineItem( row );
//   console.log( `Row updated` );
// };