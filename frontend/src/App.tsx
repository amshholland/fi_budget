import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Budget } from './components/Budget';
import Header from './components/Header/Header';
import { Transactions } from './components/Transactions';
import { OverView } from './components/Overview';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <OverView />
          </Route>
          <Route exact path="/budget">
            <Budget />
          </Route>
          <Route exact path="/transactions">
            <Transactions />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
