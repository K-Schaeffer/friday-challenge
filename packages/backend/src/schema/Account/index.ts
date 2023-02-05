import { context } from "../../context";

const { prisma } = context;

export const typeDefs = `#graphql
  type Account {
    id: String!
    name: String!
    bank: String!
  }

  type Query {
    accounts: [Account!]!
  }
`;

export const resolvers = {
  Query: {
    accounts: () => {
      return prisma.account.findMany();
    },
  },
};
