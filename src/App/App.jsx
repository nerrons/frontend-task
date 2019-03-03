import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import MainMenu from '../MainMenu/MainMenu';
import SalesMenu from '../SalesMenu/SalesMenu';
import './App.scss';

const entries = [
  {
    name: 'Sales',
    description: 'Insights about sales',
  },
  {
    name: 'Customers',
    description: 'Insights about customers',
  },
  {
    name: 'Bulletin',
    description: 'Daily summary for your business',
  },
  {
    name: 'Ask',
    description: 'Ask a question',
  },
  {
    name: 'Tasks',
    description: 'Tools for your business',
  },
  {
    name: 'Connect',
    description: 'Connect...',
  },
];

const KonigleMenu = () => (
  <MainMenu title="Konigle" entries={entries} />
);

const App = () => (
  <HashRouter>
    <div className="App">
      <Route exact path="/" component={KonigleMenu} />
      <Route exact path="/sales" component={SalesMenu} />
    </div>
  </HashRouter>
);

export {
  entries,
};

export default App;
