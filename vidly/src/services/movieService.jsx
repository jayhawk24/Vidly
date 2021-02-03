import { axios } from "axios";
import config from "./config.json";

export const getMovies = async () => {
  const response = await axios.get(config.moviesApi);
  return response.data;
};

export const deleteMovie = async (mov) => {
  const response = await axios.delete(config.moviesApi, mov);
  return response.data;
};
