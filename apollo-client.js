import { ApolloClient, InMemoryCache } from "@apollo/client";

export const TestClient = new ApolloClient({
	uri: "https://countries.trevorblades.com",
	cache: new InMemoryCache(),
});

export const AleoClient = new ApolloClient({
	uri: "https://aleochain.io/graphql",
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network",
		},
	},
});
