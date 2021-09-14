import React from 'react';
import './App.css';
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { Provider } from 'react-redux';
import Dashboard from "./components/organisms/Dashboard/Dashboard";

// 배포 레벨에서는 리덕스 logger 미사용
const enhancer = process.env.NODE_ENV === "production"
  ? compose(applyMiddleware())
  : composeWithDevTools(applyMiddleware(logger));

const store = createStore(
  rootReducer,
  enhancer
);

function App() {
  return (
    <Provider store={store}>
      <Dashboard/>
    </Provider>
  );
}

export default App;
