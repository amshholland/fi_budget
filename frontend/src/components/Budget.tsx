import './Tables/Tables.css';

import { BudgetData } from "./BudgetData";
import { EditingTable } from "./Tables/EditingTable";

export function Budget() {
  return (
    <div className="Budget">
      <h3 className='title'>Month's Budgets</h3>
      <BudgetData />
      <EditingTable />
    </div>
  );
}