import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Redirect, Route } from "react-router-dom";
import Movies from "./components/movies/movies";
import Customers from "./components/common/customers";
import Rentals from "./components/common/rentals";
import NotFound from "./components/common/not-found";
import NavBar from "./components/common/navbar";
import MovieForm from "./components/common/movieform";
import LoginForm from "./components/forms/loginform";
import Logout from "./components/common/logout";
import RegisterForm from "./components/forms/registerform";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./services/authService";

class App extends Component {
  state = {
    user: "",
  };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
