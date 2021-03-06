import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloClient, InMemoryCache, HttpLink, gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://127.0.0.1:8000/graphql",
});

const client = new ApolloClient({
  link,
  cache,
});
console.log(client);
client
  .query({
    query: gql`
      {
        allAlbums {
          name
        }
      }
    `,
  })
  .then((result) => console.log(result.data));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
