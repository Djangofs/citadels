import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Button } from '@material-ui/core';

import NameInput from '../../components/nameInput';

const ADD_USER = gql`
  mutation AddUser($name: String!) {
    addUser(name: $name) {
      name
    }
  }
`;

export default function () {
  const history = useHistory();
  const [name, setUserName] = useState('');
  const [addUser, { loading, error, data }] = useMutation(ADD_USER);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    console.log(`Submitting Name ${name}`);
    addUser({ variables: { name } });
    history.push('/games');
  };

  return (
    <form onSubmit={handleSubmit}>
      {name ? <p>Hello {name}</p> : null}
      <NameInput setUserName={setUserName} />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error please try again</p>}
      {data && <p>Response: {data.addUser.name} </p>}
    </form>
  );
}
