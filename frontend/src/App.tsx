import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { EditBudget } from './components/EditBudget';
import { EditTransaction } from './components/EditTransactions';
import { ExistingBudgetData } from './components/ExistingBudgetData';
import { ExistingTransactionData } from './components/ExistingTransactionData';
import { Goals } from './components/Goals';
import Header from './components/Header';
import { NetWorth } from './components/NetWorth';
import { Transactions } from './components/Transactions';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/budget">
            <ExistingBudgetData />
            <EditBudget />
          </Route>
          <Route path="/goals">
            <Goals />
          </Route>
          <Route path="/net-worth">
            <NetWorth />
          </Route>
          <Route path="/transactions">
            <ExistingTransactionData />
            <EditTransaction />

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
