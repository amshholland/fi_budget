import Budget from '../model/budget';
import axios from "axios";

const baseUrl = process.env.REACT_APP_BUDGET_API_URL || "";
if ( !baseUrl ) {
  console.error( "REACT_APP_API_URL environment variable not set." );
}

export async function getBudgets( accountId: string ): Promise<Budget[]> {
  return axios.get( `${ baseUrl }/budget/${ accountId }` ).then( res => res.data );
}

export function addBudgets( rows: any ): Promise<Budget> {
  return axios.post( `${ baseUrl }/add`, rows ).then( res => res.data );
}

export function deleteBudgetItem( transactionId: number ): Promise<Budget> {
  return axios.get( `${ baseUrl }/budget/delete/${ transactionId }` ).then( res => res.data );
}

export function editBudgetLineItem( row: Budget ): Promise<Budget> {
  return axios.put( `${ baseUrl }/budget/edit/${ row.transactionId }`, row ).then( res => res.data )
}