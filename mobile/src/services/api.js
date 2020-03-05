import axios from 'axios';

// const URL_BASE = "http://192.168.100.8:3333"//ip fixo da minha rede
const URL_BASE = "https://medreminder-backend.herokuapp.com";
const api = axios.create({
  baseURL: URL_BASE,
});

export default api;
