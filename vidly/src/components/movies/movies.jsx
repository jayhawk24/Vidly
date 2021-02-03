import React from "react";
import { getMovies, deleteMovie } from "../../services/movieService";
import Pagination from "../utils/pagination";
import { paginate } from "../utils/paginate";
import GenreGroup from "../common/genregroup";
import { getGenres } from "../../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import Form from "../forms/form";
import Search from "../forms/search";
import { toast } from "react-toastify";

class Movies extends Form {
  state = {
    movies: "",
    pageSize: 5,
    currentPage: 1,
    genres: "",
    selectedGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({ genres, movies });
  }

  render() {
    const {
      pageSize,
      currentPage,
      movies,
      selectedGenre,
      genres,
      sortColumn,
      searchQuery,
    } = this.state;

    if (!movies) return null;

    const { moviesLength, filtmovies } = this.getPagedData(
      movies,
      selectedGenre,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery
    );
    return (
      <React.Fragment>
        <div className="row mx-auto">
          <div className="col-3">
            <GenreGroup
              lgenres={genres}
              genreClicked={this.handleGenre}
              selectedGenre={selectedGenre}
            />
          </div>
          <div className="col">
            <button
              className="btn btn-primary btn-submit"
              style={{ marginBottom: 20 }}
            >
              <Link to="movies/new">New Movie</Link>
            </button>
            <h3>Showing {moviesLength} movies in the database.</h3>

            <Search
              value={this.state.query}
              onChange={this.handleSearch}
            ></Search>
            <MoviesTable
              filtmovies={filtmovies}
              onLike={this.handleLike}
              onDelete={this.deleteMov}
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
      </React.Fragment>
    );
  }

  deleteMov = async (mov) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((movie) => movie._id !== mov._id);
    this.setState({ movies });
    try {
      await deleteMovie(mov._id);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error("This movie is not found. Already Deleted?");
        this.setState({ movies: originalMovies });
      }
    }
  };

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

  handleSearch = (query) => {
    this.setState({ selectedGenre: null, currentPage: 1, searchQuery: query });
  };

  getPagedData(
    movies,
    selectedGenre,
    sortColumn,
    currentPage,
    pageSize,
    searchQuery
  ) {
    const filtgenre = movies.filter((m) => {
      if (searchQuery) {
        return m.title.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (selectedGenre === "All Genres" || selectedGenre === null)
        return m;
      return m.genre.name === selectedGenre ? m : "";
    });

    const sorted = _.orderBy(filtgenre, [sortColumn.path], [sortColumn.order]);

    const filtmovies = paginate(sorted, currentPage, pageSize);
    const moviesLength = filtgenre.length;
    return { moviesLength, filtmovies };
  }
}

export default Movies;
