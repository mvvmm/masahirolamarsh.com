import { CartProvider } from "../contexts/Cart";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "../utils/shopify";
import Layout from "../components/global/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ApolloProvider>
  );
}

export default MyApp;
