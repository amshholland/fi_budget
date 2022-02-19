import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { BudgetData } from './components/BudgetData';
import { EditBudget } from './components/EditBudget';
import { EditTransaction } from './components/EditTransactions';
import Header from './components/Header/Header';
import { TransactionData } from './components/TransactionData';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/budget">
            <BudgetData />
            <EditBudget />
          </Route>
          <Route path="/transactions">
            <TransactionData />
            <EditTransaction />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
