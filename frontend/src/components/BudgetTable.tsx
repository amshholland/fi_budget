import './BudgetTable.css';

import { AddToBudget } from './AddToBudget';
import { ExistingBudgetData } from './ExistingBudgetData';

export function BudgetTable() {

  return (
    <div className="BudgetTable" data-testid="BudgetTable">
      <div className="row clearfix">
        <div className="col-md-12 column">
          <table className="table table-bordered table-hover" id="tab_logic">
            <ExistingBudgetData />
            <AddToBudget />
      </table>
        </div>
      </div>
    </div>
  );
};;