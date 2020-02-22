import { CharacterDeck, Character } from './cards.types';
import { characters } from './characters';

const copyArrayOfObjects = <T>(array: T[]): T[] =>
  array.map(a => Object.assign({}, a));

const FaceUpLookup = {
  Four: 2,
  Five: 1,
  Six: 0,
  Seven: 0,
};

const isValidNumberOfPlayers = (
  players: string
): players is keyof typeof FaceUpLookup => players in FaceUpLookup;

// TODO: Better way of determining number of cards from number of players
export const newRound = (players: string): CharacterDeck => {
  if (isValidNumberOfPlayers(players)) {
    const toDeal = copyArrayOfObjects(characters);

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

export const removeCardFromDealtCards = (
  rank: number,
  dealtCards: Character[]
): [Character, Character[]] => {
  const newDealtCards = copyArrayOfObjects(dealtCards);
  const index = newDealtCards.findIndex(card => card.rank === rank);

  if (index < 0) {
    throw Error('could not find card, player has selected invalid option');
  }

  const card = newDealtCards[index];
  newDealtCards.splice(index, 1);
  return [card, newDealtCards];
};
