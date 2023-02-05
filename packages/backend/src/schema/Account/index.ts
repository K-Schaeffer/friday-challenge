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
    account(id: String!): Account!
  }
`;

export const resolvers = {
  Query: {
    accounts: () => {
      return prisma.account.findMany();
    },
    account: (_, { id }) => {
      return prisma.account.findUnique({
        where: { id },
      });
    },
  }
};
