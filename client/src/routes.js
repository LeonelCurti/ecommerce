import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./hoc/layout";
import  RegisterLogin from "./components/register_login";
import  Register from "./components/register_login/register";
import  UserDashboard from "./components/User/index";
import Auth from './hoc/auth.js'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)} />

        <Route path="/register" exact component={Auth(Register,false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)} />
        <Route path="/" exact component={Auth(Home,null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
