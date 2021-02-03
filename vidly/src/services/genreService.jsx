import http from "./httpService.js";
import config from "./config.json";

export function getGenres() {
  return http.get(config.genresApi);
}
