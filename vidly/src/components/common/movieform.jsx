import React from "react";
import Form from "../forms/form";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      stock: "",
      rate: "",
    },
    errors: {},
  };
  schema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    stock: Joi.number().required().min(0).max(100).label("Stock"),
    rate: Joi.number().required().min(0).max(5).label("Rate"),
  };

  doSubmit = () => {
    console.log("Submitted");
    this.props.history.push("/movies");
  };
  render() {
    const { match } = this.props;
    const options = ["", "Action", "Comedy", "Thriller"];
    return (
      <div>
        <h1>MovieForm {match.params.id} </h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown("genre", "Genre", options)}
          {this.renderInput("stock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
