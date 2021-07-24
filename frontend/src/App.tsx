import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Create } from './components/Create';
import { Customize } from './components/Customize';
import { Goals } from './components/Goals';
import Header from './components/Header';
import { NetWorth } from './components/NetWorth';
import React from 'react';
import { Transactions } from './components/Transactions';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/customize">
            <Customize />
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
