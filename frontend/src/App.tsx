import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Budget } from './components/Budget';
import { BudgetData } from './components/BudgetData';
import { EditTransaction } from './components/EditTransactions';
import { EditingTable } from './components/Tables/EditingTable';
import Header from './components/Header/Header';
import { TransactionData } from './components/TransactionData';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/budget">
            <Budget />
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
