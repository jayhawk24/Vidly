import React from "react";
import Form from "./form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Username/E-mail")}

          {this.renderInput("password", "Password", "password")}

          {this.renderInput("name", "Name")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
