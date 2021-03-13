import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/layout";
import Auth from './hoc/auth.js'

import Home from "./components/Home";
import Login from "./components/register_login/login";
import Register from "./components/register_login/register";
import Shop from './components/Shop'
import ProductPage from './components/Product'


import UserDashboard from "./components/User/index";
import AddProducts from "./components/User/Admin/add_products";
import ManageProductsPage from './components/User/Admin/manage_products_page'
import Cart from './components/User/cart'
import UpdateProfile from './components/User/update_profile'

import NotFound from './components/utils/not_found'

const Routes = () => {
  return (
    <Layout>
      <Switch>
      {/* PRIVATE ROUTES */}
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)} />
        <Route path="/user/cart" exact component={Auth(Cart,true)} />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile,true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProducts,true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageProductsPage,true)} />
      {/* SEMI PRIVATE ROUTES */}
        <Route path="/register" exact component={Auth(Register,false)} />
        <Route path="/login" exact component={Auth(Login,false)} />
      {/* PUBLIC ROUTES */}
        <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)} />
        <Route path="/shop" exact component={Auth(Shop,null)} />
        <Route path="/" exact component={Auth(Home,null)} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default Routes;
