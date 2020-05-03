export type District = {
  id: number;
  cost: number;
  name: string;
  alignment: 'Royal' | 'Trade' | 'Religious' | 'Military' | 'Unique';
  ability: string | null;
};

export type Deck = District[];
