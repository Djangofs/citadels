import { gql } from 'apollo-server-koa';

export const typeDefs = gql`
  type User {
    name: String
  }
  type Query {
    user: User
  }
`;

export const resolvers = {
  Query: {
    user: () => {
      return { name: 'Django' };
    },
  },
};
