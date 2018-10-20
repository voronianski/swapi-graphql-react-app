import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { Provider as ReduxProvider } from "react-redux";

import App from "./components/App";
import configureStore from "./store/configureStore";
import { populateVisitedPersons } from "./store/actions";
import sessionUtil from "./utils/session";

import "./styles.css";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graphcms.com/simple/v1/swapi"
  }),
  cache: new InMemoryCache()
});

const store = configureStore();
const savedPersonIds = sessionUtil.getPersonIds();

store.dispatch(populateVisitedPersons(savedPersonIds));
store.subscribe(() => {
  const { visitedPersons } = store.getState();

  sessionUtil.savePersonIds(visitedPersons);
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
