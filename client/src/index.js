import React from "react";
import ReactDOM from "react-dom";
import "./Resources/css/styles.css";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import ScrollToTop from "./components/utils/ScrollToTop";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Reducer from './reducers';

const middleware = [promiseMiddleware,ReduxThunk];

const store = createStore(Reducer, composeWithDevTools(applyMiddleware(...middleware)));

ReactDOM.render(
  <Provider 
    store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <Routes />
    </BrowserRouter>
  </Provider>
,document.getElementById("root"));
