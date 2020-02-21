import React from "react";
import Conflictor from "./conflictor";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/rootReducer";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default function App() {
  return (
    <Provider store={store}>
      <Conflictor />
    </Provider>
  );
}
