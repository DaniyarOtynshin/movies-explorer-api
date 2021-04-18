const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {

  console.log(`App listening on port ${PORT}`)
})