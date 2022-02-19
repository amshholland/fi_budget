import Budget from '../model/budget';
import axios from "axios";

const baseUrl = process.env.REACT_APP_BUDGET_API_URL || "";
if ( !baseUrl ) {
  console.error( "REACT_APP_API_URL environment variable not set." );
}

export async function getBudgetsForAccount( accountId: string ): Promise<Budget[]> {
  return axios.get( `${ baseUrl }/budget/${ accountId }` ).then( res => res.data );
}

export function addBudgetForAccount( rows: Budget[] ): Promise<Budget[]> {
  return axios.post( `${ baseUrl }/budget/add`, rows ).then( res => res.data );
}

export function deleteBudgetByBudgetId( id: number ): Promise<Budget> {
  return axios.get( `${ baseUrl }/budget/delete/${ id }` ).then( res => res.data );
}

export function editExistingBudget( row: Budget ): Promise<Budget> {
  return axios.put( `${ baseUrl }/budget/edit/${ row.id }`, row ).then( res => res.data );
}