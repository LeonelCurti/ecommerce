import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/layout";
import Auth from './hoc/auth.js'

import Home from "./components/Home";
import RegisterLogin from "./components/register_login";
import Register from "./components/register_login/register";
import Shop from './components/Shop'
import ProductPage from './components/Product'

import UserDashboard from "./components/User/index";
import AddProducts from "./components/User/Admin/add_products";
import ManageCategories from './components/User/Admin/manage_categories'

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProducts,true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)} />

        <Route path="/register" exact component={Auth(Register,false)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)} />
        
        <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)} />
        <Route path="/shop" exact component={Auth(Shop,null)} />
        <Route path="/" exact component={Auth(Home,null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
