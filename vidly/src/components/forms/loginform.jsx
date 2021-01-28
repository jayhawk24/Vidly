import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
      errors: {},
    },
  };
  render() {
    const { username, password } = this.state.account;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={username}
            label="Username"
            onChange={this.handleChange}
          ></Input>
          <Input
            name="password"
            value={password}
            label="Password"
            onChange={this.handleChange}
          ></Input>

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };
  validate = () => {
    return { username: "Username is Required." };
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
  };
}
export default LoginForm;
