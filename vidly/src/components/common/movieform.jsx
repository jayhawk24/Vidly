import React from "react";
import Form from "../forms/form";
import Joi from "joi-browser";
import { getGenres } from "../../services/genreService";
import { getMovie, saveMovie } from "../../services/movieService";
class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: "",
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(5).label("Rate"),
  };

  async componentDidMount() {
    // Populating Genres

    const { data } = await getGenres();
    this.setState({ genres: data });

    // Populating Movies

    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({
        data: this.mapToViewModel(movie),
      });
    } catch (e) {
      if (e.response && e.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(mov) {
    return {
      _id: mov._id,
      title: mov.title,
      genreId: mov.genre._id,
      numberInStock: mov.numberInStock,
      dailyRentalRate: mov.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { match } = this.props;
    if (!this.state.genres) return null;
    return (
      <div>
        <h1>MovieForm {match.params.id} </h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
