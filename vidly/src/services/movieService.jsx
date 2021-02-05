import http from "./httpService";

const apiEndpoint = "/movies";

export const getMovies = async () => {
  return http.get(apiEndpoint);
};

export const deleteMovie = async (movieId) => {
  return http.delete(apiEndpoint + "/" + movieId);
};

export const getMovie = async (id) => {
  return http.get(apiEndpoint + "/" + id);
};

export const saveMovie = async (newMovie) => {
  if (newMovie._id) {
    const data = { ...newMovie };
    delete data._id;
    return http.put(apiEndpoint + "/" + newMovie._id, data);
  }
  return http.post(apiEndpoint, newMovie);
};
