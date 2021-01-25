import React, { Component } from "react";
import { getMovies } from "../../services/fakeMovieService";
import Pagination from "../common/pagination";
import { paginate } from "../utils/paginate";
import GenreGroup from "../common/genregroup";
import { getGenres } from "../../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 5,
    currentPage: 1,
    genres: getGenres(),
    selectedGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies,
      selectedGenre,
      genres,
      sortColumn,
    } = this.state;

    const { moviesLength, filtmovies } = this.getPagedData(
      movies,
      selectedGenre,
      sortColumn,
      currentPage,
      pageSize
    );

    const styles = {
      marginTop: 200,
    };

    return (
      <div className="row mx-auto" style={styles}>
        <div className="col-3">
          <GenreGroup
            lgenres={genres}
            genreClicked={this.handleGenre}
            selectedGenre={selectedGenre}
          />
        </div>

        <div className="col">
          <h3>Showing {moviesLength} movies in the database.</h3>
          <MoviesTable
            filtmovies={filtmovies}
            onLike={this.handleLike}
            onDelete={this.deleteMovie}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          ></MoviesTable>
          <Pagination
            itemsCount={moviesLength}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          ></Pagination>
        </div>
      </div>
    );
  }

  deleteMovie = (mov) =>
    this.setState({
      movies: this.state.movies.filter((movie) => movie._id !== mov._id),
    });

  handleLike = (mov) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(mov);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenre = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData(movies, selectedGenre, sortColumn, currentPage, pageSize) {
    const filtgenre = movies.filter((m) => {
      if (selectedGenre === "All Genres") return m;
      return m.genre.name === selectedGenre ? m : "";
    });

    const sorted = _.orderBy(filtgenre, [sortColumn.path], [sortColumn.order]);

    const filtmovies = paginate(sorted, currentPage, pageSize);
    const moviesLength = filtgenre.length;
    return { moviesLength, filtmovies };
  }
}

export default Movies;
