import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Budget } from './components/Budget';
import Header from './components/Header/Header';
import { Transactions } from './components/Transactions';

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
            <Transactions />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
