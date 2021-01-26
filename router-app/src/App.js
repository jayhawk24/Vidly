import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import "./App.css";
import Products from "./components/products";
import Posts from "./components/posts";
import Dashboard from "./components/admin/dashboard";
import Home from "./components/home";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/products/:id" component={ProductDetails}></Route>
            <Route path="/products" component={Products}></Route>
            <Route path="/posts/:year?/:month?" component={Posts}></Route>
            <Route path="/admin" component={Dashboard}></Route>
            <Redirect from="/msg" to="/posts"></Redirect>
            <Route path="/" exact component={Home}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
