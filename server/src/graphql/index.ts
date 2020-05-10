import { gql } from 'apollo-server-koa';
interface CitadelsContext {
  session: {
    name: String;
  };
}
interface addUserArgs {
  name: String;
}

interface addUserResponse {
  name: String;
}

export const typeDefs = gql`
  type User {
    name: String
  }
  type Query {
    user: User
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
  },
  Mutation: {
    addUser: (
      parent: any,
      args: addUserArgs,
      ctx: CitadelsContext
    ): addUserResponse => {
      ctx.session.name = args.name;
      return { name: ctx.session.name || '' };
    },
  },
};
