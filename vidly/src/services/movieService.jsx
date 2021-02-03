import http from "./httpService";
import config from "./config.json";

export const getMovies = async () => {
  return http.get(config.moviesApi);
};

export const deleteMovie = async (movieId) => {
  return http.delete(config.moviesApi + "/" + movieId);
};

export const getMovie = async (id) => {
  return http.get(config.moviesApi + "/" + id);
};

export const saveMovie = async (newMovie) => {
  if (newMovie._id) {
    const data = { ...newMovie };
    delete data._id;
    return http.put(config.moviesApi + "/" + newMovie._id, data);
  }
  return http.post(config.moviesApi, newMovie);
};
