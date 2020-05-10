import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { NameInput, Button } from './styled';

const ADD_USER = gql`
  mutation AddUser($name: String!) {
    addUser(name: $name) {
      name
    }
  }
`;

export default function () {
  const [name, setName] = useState('');
  const [addUser, { loading, error, data }] = useMutation(ADD_USER);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    console.log(`Submitting Name ${name}`);
    addUser({ variables: { name } });
  };

  return (
    <form onSubmit={handleSubmit}>
      {name ? <p>Hello {name}</p> : null}
      <NameInput
        id="name"
        name="name"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <Button type="submit">Submit</Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error please try again</p>}
      {data && <p>Response: {data.addUser.name} </p>}
    </form>
  );
}
