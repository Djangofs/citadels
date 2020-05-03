import { newRound, removeCardFromDealtCards } from './cards';
import { CharacterDeck, Character } from '../types/cards.types';

const reducer = (accumulator: number, currentValue: any[]): number =>
  accumulator + currentValue.length;

describe('Function: newRound', () => {
  test('should always return total array of 8', () => {
    const response: CharacterDeck = newRound('Four');
    const values: Character[][] = Object.values(response);
    const sum = values.reduce(reducer, 0);
    expect(sum).toBe(8);
  });

  test('should always return 1 face down card', () => {
    const response: CharacterDeck = newRound('Four');
    expect(response.faceDown.length).toBe(1);
  });

  test('should return 2 faceup cards when there are 4 players', () => {
    const response: CharacterDeck = newRound('Four');
    expect(response.faceUp.length).toBe(2);
  });

  test('should return 1 faceup cards when there are 5 players', () => {
    const response: CharacterDeck = newRound('Five');
    expect(response.faceUp.length).toBe(1);
  });

  test('should return 0 faceup cards when there are 6 or 7 players', () => {
    const response: CharacterDeck = newRound('Six');
    expect(response.faceUp.length).toBe(0);
    const response2: CharacterDeck = newRound('Seven');
    expect(response2.faceUp.length).toBe(0);
  });

  test('should throw an error if there is an invaid number of players', () => {
    try {
      newRound('Zero');
    } catch (err) {
      expect(err.message).toBe('invalid number of players');
    }
  });
});

describe('Function: removeCardFromDealtCards', () => {
  const dealtCards = [
    {
      name: 'Assassin',
      rank: 1,
      description: 'Kill someone',
    },
    {
      name: 'Thief',
      rank: 2,
      description: 'Steal gold',
    },
    {
      name: 'Magician',
      rank: 3,
      description: 'Swap cards',
    },
  ];
  test('should throw an error is invalid card is given', () => {
    try {
      removeCardFromDealtCards(5, dealtCards);
    } catch (err) {
      expect(err.message).toBe(
        'could not find card, player has selected invalid option'
      );
    }
  });

  test('should return card and new dealtCards', () => {
    const [card, newDealtCards] = removeCardFromDealtCards(1, dealtCards);
    expect(card).toEqual({
      name: 'Assassin',
      rank: 1,
      description: 'Kill someone',
    });
    expect(newDealtCards).toEqual([
      {
        name: 'Thief',
        rank: 2,
        description: 'Steal gold',
      },
      {
        name: 'Magician',
        rank: 3,
        description: 'Swap cards',
      },
    ]);
  });
});
