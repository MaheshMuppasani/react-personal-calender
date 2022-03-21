import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleWare from "redux-thunk";
import allReducers from "./reducers";

const myLogger = () => (next) => (action) => {
  console.log("Logged action: ", action);
  next(action);
};

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })
    : compose;

let store = createStore(
  allReducers,
  {},
  composeEnhancers(applyMiddleware(thunkMiddleWare))
);

export default store;
