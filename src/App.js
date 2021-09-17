import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { Router, Switch } from "react-router";

import { history } from "./router/history";
import Routes from "./router/routes";
import Footer from "./components/Footer";
import Header from "./components/Header";

import marvelReducer from "./store/reducers";

const store = createStore(marvelReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Routes />
          </Switch>
          <Footer />
        </BrowserRouter>
      </Router>
    </Provider>
  );
};

export default App;
