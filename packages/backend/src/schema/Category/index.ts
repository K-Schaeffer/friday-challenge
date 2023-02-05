import { context } from "../../context";

const { prisma } = context;

export const typeDefs = `#graphql
  type Category {
    id: String!
    name: String!
    color: String
  }

  type Query {
    categories: [Category!]!
  }
`;

export const resolvers = {
  Query: {
    categories: () => {
      return prisma.category.findMany();
    },
  },
};
