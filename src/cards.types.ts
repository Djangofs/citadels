export type Character = {
  name: string;
  rank: number;
  description: string;
};

export type CharacterDeck = {
  faceUp: Character[];
  faceDown: Character[];
  dealt: Character[];
};
