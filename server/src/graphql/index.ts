import { importSchema } from 'graphql-import';
import { Game, User, MutationAddUserArgs } from './types';
interface CitadelsContext {
  session: {
    name: string;
  };
}

export const typeDefs = importSchema('**/*.graphql');

export const resolvers = {
  Query: {
    user: (parent: {}, args: {}, ctx: CitadelsContext) => {
      return { name: ctx.session.name || '' };
    },
    games: (): Game[] => {
      return [
        {
          name: 'Game 1',
          playerLimit: 8,
          players: 4,
          ruleset: 'Standard',
          open: true,
        },
        {
          name: 'Game 2',
          playerLimit: 4,
          players: 4,
          ruleset: 'Standard',
          open: true,
        },
      ];
    },
  },
  Mutation: {
    addUser: (
      parent: any,
      args: MutationAddUserArgs,
      ctx: CitadelsContext
    ): User => {
      ctx.session.name = args.name;
      return { name: ctx.session.name || '' };
    },
  },
};
