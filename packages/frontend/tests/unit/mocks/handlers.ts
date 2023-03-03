import { graphql } from "msw";

export const handlers = [
  // Handles a "transactions" query
  graphql.query("transactions", (_, res, ctx) => {
    return res(
      ctx.data({
        transactions: [
          {
            id: "fooTransactionId",
            account: {
              id: "fooAccountId",
              name: "fooAccountName",
              bank: "fooAccountBank",
              __typename: "Account",
            },
            reference: "fooTransactionReference",
            category: {
              id: "fooCategoryId",
              name: "fooCategoryName",
              color: "e66100",
              __typename: "Category",
            },
            date: "2022-03-07T16:54:39.434Z",
            amount: 1000,
            currency: "EUR",
            __typename: "Transaction",
          },
        ],
      })
    );
  }),
];
