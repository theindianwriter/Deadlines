import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { logger } from "redux-logger";
import rootSaga from "./../src/sagas/rootSaga";
import { loadState, saveState } from "./localStorage";
import createSagaMiddleware from "redux-saga";
import { messaging } from "./config/fbConfig";
import firebase from "./config/fbConfig";


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(sagaMiddleware, logger) //redux logger to show the changes
  //in state of the redux store in the console
);
sagaMiddleware.run(rootSaga);

// subscribe function helps us to preserve  the state of
//  the redux state even if the refresh button is tapped

let db = firebase.firestore();

store.subscribe(() => {
  const storestate = store.getState();
  saveState(storestate); // saves the redux store
});

//if the token is refreshed then this function is called to get the refreshed token
// and set it to the server
messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then(refreshedToken => {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          token: refreshedToken
        });
    })
    .catch(err => {
      console.log("Unable to retrieve refreshed token ", err);
    });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
