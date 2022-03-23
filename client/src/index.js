import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import LoginPage from "./views/LoginPage/LoginPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import ErrorPage from "views/ErrorPage/errorPage";

export const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path={["/", "/about"]} component={ProfilePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route path='*' component={ErrorPage}></Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
