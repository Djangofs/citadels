import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import logo from './logo.svg';
import './App.css';

const GET_USER = gql`
  query {
    user {
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_USER);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to Citadels!</p>
        <p>Hello {data.user.name}</p>
      </header>
    </div>
  );
}

export default App;
