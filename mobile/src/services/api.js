import axios from 'axios';

const URL_BASE = "http://192.168.100.8"

const api = axios.create({
  baseURL: URL_BASE,
});

export default api;
