import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { BudgetTable } from './components/BudgetTable';
import { Customize } from './components/Customize';
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
            <BudgetTable />
          </Route>
          <Route path="/goals">
            <Goals />
          </Route>
          <Route path="/net-worth">
            <NetWorth />
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
