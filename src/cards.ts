import { CharacterDeck } from './cards.types';

const FaceUpLookup = {
  Four: 2,
  Five: 1,
  Six: 0,
  Seven: 0,
};

const isValidNumberOfPlayers = (
  players: string
): players is keyof typeof FaceUpLookup => {
  return players in FaceUpLookup;
};

export const newRound = (players: string): CharacterDeck => {
  if (isValidNumberOfPlayers(players)) {
    const toDeal = [1, 2, 3, 4, 5, 6, 7, 8];

    const faceDown = toDeal.splice(
      Math.floor(Math.random() * toDeal.length),
      1
    );

    const faceUp = toDeal.splice(
      Math.floor(Math.random() * toDeal.length),
      FaceUpLookup[players]
    );

    return {
      faceUp,
      faceDown,
      dealt: toDeal,
    };
  }
  throw Error('invalid number of players');
};
