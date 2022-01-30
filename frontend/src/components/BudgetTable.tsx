import './BudgetTable.css';

import { AddToBudget } from './AddToBudget';
import { ExistingBudgetData } from './ExistingBudgetData';
import { TableHeader } from './TableHeader';

export function BudgetTable() {

  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-md-12 column">
          <table className="table table-bordered table-hover" id="tab_logic">
            <TableHeader />
            <tbody>
              <ExistingBudgetData />
              <AddToBudget />
            </tbody>
      </table>
        </div>
      </div>
    </div>
  );
};;