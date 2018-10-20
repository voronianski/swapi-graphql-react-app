import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./reducers";

export default function configureStore(preloadedState) {
  const middlewares = [];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, preloadedState, middlewareEnhancer);

  return store;
}
