import http from "./httpService.js";

const apiEndpoint = "/genres";
export function getGenres() {
  return http.get(apiEndpoint);
}
