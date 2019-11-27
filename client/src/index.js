import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/styles.css";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducer from './reducers';

const middlewares = [promiseMiddleware,ReduxThunk];

const store = createStore(Reducer, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider 
    store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
,document.getElementById("root"));
