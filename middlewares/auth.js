const jwt = require('jsonwebtoken');
const NotValidTokenError = require('../errors/invalid-token-err');

const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotValidTokenError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      throw new NotValidTokenError('Неверный токен');
    }
    next(err);
  }

  req.user = payload;
  next();
};
