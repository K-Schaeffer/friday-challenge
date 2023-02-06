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
    // TODO: We should have anoter query to either search for transactions or filter them, it also needs pagination
  },
  DateTime: DateTimeResolver,
};
