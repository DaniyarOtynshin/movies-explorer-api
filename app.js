const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { PORT = 3000, DB = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
