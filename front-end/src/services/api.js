import axios from 'axios';

const api = axios.create({
  //https://medreminder-backend.herokuapp.com servidor 
  // baseURL: 'http://localhost:3333',//meu localhost
  baseURL: 'https://medreminder-backend.herokuapp.com'
});


export default api;
