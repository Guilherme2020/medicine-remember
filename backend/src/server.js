const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const app =  express();
mongoose.connect('mongodb+srv://guilherme:dev1212@cluster0-ptfgq.mongodb.net/medicine-reminder?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);