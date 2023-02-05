import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeDefs = `#graphql
  type Account {
    name: String
    bank: String
  }

  type Query {
    accounts: [Account!]!
  }
`;

const resolvers = {
  Query: {
    accounts: () => {
      return prisma.account.findMany();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: parseInt(process.env.SERVER_PORT) },
});

console.log(`🚀  Server ready at: ${url}`);
