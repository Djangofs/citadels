import React, { useState } from 'react';
import { NameInput, Button } from './styled';

export default function () {
  const [name, setName] = useState('');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    alert(`Submitting Name ${name}`);
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
    </form>
  );
}
