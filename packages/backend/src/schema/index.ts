import lodash from "lodash";

import { typeDefs as Account, resolvers as AccountResolvers } from "./Account";

import {
  typeDefs as Category,
  resolvers as CategoryResolvers,
} from "./Category";

import {
  typeDefs as Transaction,
  resolvers as TransactionResolvers,
} from "./Transaction";

export const typeDefs = [Account, Category, Transaction];

const { merge } = lodash;

export const resolvers = {
  ...merge(AccountResolvers, CategoryResolvers, TransactionResolvers),
};
