import axios from 'axios';

const URL_BASE = "http://192.168.100.8:3333"

const api = axios.create({
  baseURL: URL_BASE,
});

export default api;
