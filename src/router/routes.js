import React from "react";
import { Redirect, Route } from "react-router";
import Character from "../pages/Character";
import Home from "../pages/Home";
import Edit from "../pages/Edit";

const Routes = () => {
  return (
    <main className="main-content">
      <Route exact path="/home" render={() => <Redirect to="/" />} />
      <Route exact path="/" component={Home} />
      <Route exact path="/character/:id" component={Character} />
      <Route exact path="/edit/" component={Edit} />
      <Route exact path="/edit/:id" component={Edit} />
    </main>
  );
};

export default Routes;
