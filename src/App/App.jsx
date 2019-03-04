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

const month = 'November';
const currency = 'SGD';
const amount = 80586.54;
const cards = [
  {
    cardId: 0,
    title: `Total sales in ${month}?`,
    content: `You have sales worth ${currency} ${amount} in the last 30 days.`,
  },
  {
    cardId: 1,
    title: 'Total sales this week?',
    content: 'You have not sold anything this week or you have not uploaded your invoices.',
  },
  {
    cardId: 2,
    title: 'Card #3',
    content: '#3 Lorem ipsum dolor sit amet',
  },
  {
    cardId: 3,
    title: 'Card #4',
    content: '#4 consectetur adipiscing elit',
  },
];


const KonigleMainMenu = () => (
  <MainMenu title="Konigle" entries={entries} />
);


const KonigleSalesMenu = () => (
  <SalesMenu
    entryName={entries[0].name}
    entryDescription={entries[0].description}
    cards={cards}
  />
);

const App = () => (
  <HashRouter>
    <div className="App">
      <Route exact path="/" component={KonigleMainMenu} />
      <Route exact path="/sales" component={KonigleSalesMenu} />
    </div>
  </HashRouter>
);


export {
  entries,
  cards,
};

export default App;
