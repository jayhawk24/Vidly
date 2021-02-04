import http from "./httpService";
import config from "./config.json";

export function register(user) {
  return http.post(config.usersApi, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}
