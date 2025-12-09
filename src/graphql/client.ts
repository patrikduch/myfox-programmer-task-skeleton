import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import {
  GRAPHQL_API_URI,
  GRAPHQL_API_KEY,
} from "@/constants/graphql-constants";

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URI,
  headers: {
    "X-Api-Key": GRAPHQL_API_KEY,
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
