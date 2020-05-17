import React from 'react';
import { Input } from '@material-ui/core';

type setUserNameFunction = React.Dispatch<React.SetStateAction<string>>;

export default function ({
  setUserName,
}: {
  setUserName: setUserNameFunction;
}) {
  return (
    <Input
      id="name"
      name="name"
      placeholder="Name"
      onChange={(e) => setUserName(e.target.value)}
    />
  );
}
