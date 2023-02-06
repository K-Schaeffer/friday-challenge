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
    category(id: String!): Category!
  }

  input CategoryContent {
    name: String!
    color: String
  }

  type Mutation {
    addCategory(categoryContent: CategoryContent!): Category!
    editCategory(id: String!, categorycontent: CategoryContent!): Category!
    deleteCategory(id: String!): Category
  }
`;

export const resolvers = {
  Query: {
    categories: () => {
      return prisma.category.findMany();
    },
    category: (_, { id }) => {
      return prisma.category.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    addCategory: (_, { categoryContent }) => {
      return prisma.category.create({
        data: { ...categoryContent },
      });
    },
    editCategory: (_, { id, categorycontent }) => {
      return prisma.category.update({
        where: { id },
        data: { id, ...categorycontent }
      })
    },
    deleteCategory: async (_, { id }) => {
      const transactionsThatUseThisCategory = await prisma.transaction.count({
        where: { categoryId: id }
      });

      // As I decided that all transactions must have a category, I need to check this here 
      // (https://github.com/K-Schaeffer/friday-challenge/blob/main/packages/backend/prisma/seeds/Transaction/index.ts#L25)
      if (transactionsThatUseThisCategory) {
        throw new Error('Unable to delete category attached to one or more transactions')
      }

      return prisma.category.delete({
        where: { id }
      })
    }
  },
};
