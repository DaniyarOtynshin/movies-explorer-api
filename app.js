const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/index');

const app = express();

const { PORT = 3000, DB = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
