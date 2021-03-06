import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { register } from '../services/userService';

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    // Call the server
    //console.log("Submitted");
    try {
      const response = await register(this.state.data)
      console.log(response);
      localStorage.setItem('token', response.headers['x-auth-token']);
      window.location = '/'
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors }
        errors.username = ex.response.data;
        this.setState({ errors })
      }
    }
  };

  render() {
    return (
      <div className="container">
        <br/>
        <br/>
        <h1>Register here</h1>
        <br/>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          <br/>
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
