import { District, Deck } from '../types/districts.types';

export const newDeck = (uniqueDistricts: number[]): Deck => {};

export const drawFromDeck = (deck: Deck): [District, District] => {};

export const selectFromDeck = (
  selected: number,
  rejected: number,
  deck: Deck
): Deck => {};

// export const shuffleDeck = (deck: Deck): Deck => {};
