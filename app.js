const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB } = require('./config');

const options = {
  origin: ['https://filmderdi-zerttewsi.nomoredomains.icu'],
  credentials: true,
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
  .then(() => {
    const app = express();
    app.use(cors(options));
    app.use('/', apiLimiter);
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(requestLogger);
    app.use(routes);
    app.use(errorLogger);
    app.use(errors());
    app.use(errorHandler);
    app.listen(PORT);
  });
