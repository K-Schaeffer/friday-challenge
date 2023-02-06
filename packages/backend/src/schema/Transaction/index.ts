import { DateTimeResolver } from "graphql-scalars";
import { context } from "../../context";

const { prisma } = context;

export const typeDefs = `#graphql
  type Transaction {
    id: String!
    account: Account!
    category: Category!
    reference: String
    amount: Float
    currency: String
    date: DateTime
  }

  type Query {
    transactions(limit: Int, offset: Int): [Transaction!]!
    transaction(id: String!): Transaction!
  }

  type Mutation {
    updateTransactionCategory(id: String!, categoryId: String!): Transaction!
  }

  scalar DateTime
`;

export const resolvers = {
  Query: {
    transactions: (_, { limit, offset }) => {
      return prisma.transaction.findMany({
        skip: offset,
        take: limit,
        include: {
          account: true,
          category: true,
        },
      });
    },
    transaction: (_, { id }) => {
      return prisma.transaction.findUnique({
        where: { id },
        include: {
          account: true,
          category: true,
        },
      });
    },
  },
  Mutation: {
    updateTransactionCategory: (_, { id, categoryId }) => {
      return prisma.transaction.update({
        where: { id },
        data: {
          categoryId,
        },
        include: {
          account: true,
          category: true,
        },
      });
    },
  },
  DateTime: DateTimeResolver,
};
