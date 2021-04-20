const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  if (isCelebrateError(err)) {
    message = 'Ошибка валидации';
  }

  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
