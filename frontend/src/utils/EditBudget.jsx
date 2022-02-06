import { addBudgets } from '../service/Budget';

export const handleSubmit = ( rows ) => {
  console.log( rows );
  addBudgets( rows );
  console.log( `Form submitted` );
};
