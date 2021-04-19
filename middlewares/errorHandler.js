const errorHandler = (err, res) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  return res.status(statusCode).send({ message });
};

module.exports = errorHandler;
