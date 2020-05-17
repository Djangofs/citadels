import { gql } from 'apollo-server-koa';
interface CitadelsContext {
  session: {
    name: string;
  };
}
interface AddUserArgs {
  name: string;
}

interface AddUserResponse {
  name: string;
}

interface Game {
  name: string;
  playerLimit: number;
  players: number;
  ruleset: string;
  open: boolean;
}

export const typeDefs = gql`
  type User {
    name: String
  }

  type Games {
    name: String
    playerLimit: Int
    players: Int
    ruleset: String
    open: Boolean
  }

  type Query {
    user: User
    games: [Games]
  }
  type Mutation {
    addUser(name: String): User
  }
`;

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
      args: AddUserArgs,
      ctx: CitadelsContext
    ): AddUserResponse => {
      ctx.session.name = args.name;
      return { name: ctx.session.name || '' };
    },
  },
};
