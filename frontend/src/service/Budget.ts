import { Account } from './../model/account';
import Budget from '../model/budget';
import axios from "axios";

const baseUrl = process.env.REACT_APP_BUDGET_API_URL || "";
if ( !baseUrl ) {
  console.error( "REACT_APP_API_URL environment variable not set." );
}

export function addBudgets( row: Budget ): Promise<Budget> {
  const budget: Budget =
  {
    accountId: row.accountId,
    type: row.type,
    category: row.category,
    amount: row.amount,
    date: row.date,
    note: row.note
  };
  return axios.post( `${ baseUrl }/add`, budget ).then( res => res.data );
}

export function getBudgets( accountId: string ): Promise<Budget[]> {
  return axios.get( `${ baseUrl }/budget/${ accountId }` ).then( res => res.data );
}