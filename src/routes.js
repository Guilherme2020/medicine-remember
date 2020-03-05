const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const MedicineController = require('./controllers/MedicineController');
const routes = express.Router();


routes.get('/', (req, res) => {
  return res.json({message: 'Hello app'});
})
routes.post('/login',SessionController.login);
routes.get('/user', UserController.index);
routes.post('/user',UserController.store);
routes.get('/medicine',MedicineController.index);
routes.post('/medicine',MedicineController.store);

module.exports = routes;