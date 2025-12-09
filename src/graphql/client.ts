import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://cmyp37vc53jlbv5wa3nrnez6mi0dktla.lambda-url.eu-central-1.on.aws/",
  headers: {
    "X-Api-Key": "da2-gcyvktbwpfhnznbpdaghdbyf7m",
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
