import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

interface Game {
  name: string;
  playerLimit: number;
  players: number;
  ruleset: string;
  open: boolean;
}

interface GamesResponse {
  games: Game[];
}

const GET_GAMES = gql`
  query {
    games {
      name
      playerLimit
      players
      open
      ruleset
    }
  }
`;

// const createData = ({ name, playerLimit, players, ruleset, open }: Game) => ({
//   name,
//   playerLimit,
//   players,
//   ruleset,
//   open,
// });

export default function () {
  const { loading, error, data } = useQuery(GET_GAMES);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Players</TableCell>
            <TableCell align="right">Player Limit</TableCell>
            <TableCell align="right">Ruleset</TableCell>
            <TableCell align="right">Open</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.games.map((game: Game) => (
            <TableRow key={game.name}>
              <TableCell component="th" scope="row">
                {game.name}
              </TableCell>
              <TableCell align="right">{game.players}</TableCell>
              <TableCell align="right">{game.playerLimit}</TableCell>
              <TableCell align="right">{game.ruleset}</TableCell>
              <TableCell align="right">{game.open.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
