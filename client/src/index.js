import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Resources/css/styles.css";
import "./Resources/css/mobile.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import ScrollToTop from "./components/utils/ScrollToTop";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducers";

const middleware = [promiseMiddleware, reduxThunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
