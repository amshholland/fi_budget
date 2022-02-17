import Transaction from '../model/transaction';
import axios from "axios";

const baseUrl = process.env.REACT_APP_BUDGET_API_URL || "";
if ( !baseUrl ) {
  console.error( "REACT_APP_API_URL environment variable not set." );
}

export async function getTransactionsForAccount( accountId: string ): Promise<Transaction[]> {
  return axios.get( `${ baseUrl }/transaction/${ accountId }` ).then( res => res.data );
}

export function addTransactionsForAccount( rows: Transaction[] ): Promise<Transaction[]> {
  console.log( `addTransaction ${ rows }` );
  return axios.post( `${ baseUrl }/add`, rows ).then( res => res.data );
}

export function deleteTransaction( transactionId: number ): Promise<Transaction> {
  return axios.get( `${ baseUrl }/transaction/delete/${ transactionId }` ).then( res => res.data );
}

export function editExistingTransaction( row: Transaction ): Promise<Transaction> {
  return axios.put( `${ baseUrl }/transaction/edit/${ row.transactionId }`, row ).then( res => res.data );
}