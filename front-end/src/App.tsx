import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import logo from './logo.svg';
import './App.css';
import HomePage from './pages/home';
import GamesList from './components/gamesList';

const GET_USER = gql`
  query {
    user {
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USER);
  if (loading) return <div>Loading Name...</div>;
  if (error) return <div>Error Loading Name :(</div>;

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            <Route path="/games">
              <GamesList />
            </Route>
            <Route path="/">
              {data && data.user.name ? <GamesList /> : <HomePage />}
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
