import './BudgetAndTransactions.css';

import { BudgetData } from "./BudgetData";
import { EditingTable } from "./Tables/EditingTable";

export function Budget() {
  return (
    <div className="Budget">
      <BudgetData />
      <EditingTable />
    </div>
  );
}