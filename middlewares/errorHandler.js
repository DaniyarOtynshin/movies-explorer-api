const errorHandler = (err, res) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  switch (err.kind || err.name || Object.keys(err.errors)[0]) {
    case 'Error':
      return res.status(404).send({ message: err.message });
    case 'ValidationError':
      return res.status(400).send({ message: err.message });
    default:
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};

module.exports = errorHandler;
