import "tailwindcss/tailwind.css";
import { ApolloProvider } from "@apollo/client";
import { AleoClient as client } from "../apollo-client";

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}
export default MyApp;
