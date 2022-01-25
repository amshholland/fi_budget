import './BudgetTable.css';

import { AddToBudget } from './AddToBudget';
import { ExistingBudgetData } from './ExistingBudgetData';

export function BudgetTable() {
  return (
    <div className="BudgetTable">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <ExistingBudgetData />
      </table>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Type</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <AddToBudget />
      </table>
    </div>
  );
};;