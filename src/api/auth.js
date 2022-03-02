import axios from 'axios';
import { config } from '../config';

async function register(data) {
  return await axios.post(`${config.api_host}/auth/register`, data);
}

async function login(email, password) {
  return await axios.post(`${config.api_host}/auth/login`, { email, password });
}

async function logout() {
  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

  return await axios
    .post(`${config.api_host}/auth/logout`, null, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      localStorage.removeItem('auth');
      return response;
    });
}

export { register, login, logout };
