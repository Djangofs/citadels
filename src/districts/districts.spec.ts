import { selectFromDeck } from './districts';
import { District, Deck } from '../types/districts.types';

describe.skip('Function: selectFromDeck', () => {
  let response: Deck;
  beforeEach(() => {
    const deck: Deck = [
      {
        id: 1,
        cost: 4,
        name: 'Castle',
        alignment: 'Royal',
        ability: null,
      },
      {
        id: 2,
        cost: 3,
        name: 'Tavern',
        alignment: 'Trade',
        ability: null,
      },
      {
        id: 3,
        cost: 1,
        name: 'Prison',
        alignment: 'Military',
        ability: null,
      },
      {
        id: 4,
        cost: 2,
        name: 'Church',
        alignment: 'Religious',
        ability: null,
      },
    ];
    response = selectFromDeck(1, 2, deck);
  });
  test('should remove 1 card from the deck', () => {
    expect(response[response.length]).toEqual({
      id: 2,
      cost: 3,
      name: 'Tavern',
      alignment: 'Trade',
      ability: null,
    });
  });
  test('should place rejected card at bottom of deck', () => {});
});
