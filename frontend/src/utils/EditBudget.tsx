import { addBudgets, deleteBudgetItem, editBudgetLineItem } from '../service/Budget';

import Budget from '../model/budget';

export const handleAddNewBudget = ( rows: Budget ) => {
  addBudgets( rows );
  console.log( `Form submitted` );
};

export const handleDelete = ( transactionId: number ) => {
  deleteBudgetItem( transactionId );
  console.log( `Row deleted` );
};

export const bulkDeleteBudgetLineItems = ( rows: Budget[] ) => {
  rows.forEach( row => {
    deleteBudgetItem( row.transactionId! );
  } );
};

export const editExistingBudgetLineItem = ( row: Budget ) => {
  editBudgetLineItem( row );
  console.log( `Row updated` );
};