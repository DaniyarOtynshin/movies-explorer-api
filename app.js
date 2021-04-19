const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

const { PORT = 3000, DB = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(routes);

app.use(errorHandler);

app.listen(PORT);
