import http from "./httpService";
import config from "./config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(config.authApi, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
