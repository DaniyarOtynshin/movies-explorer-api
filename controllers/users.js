const User = require('../models/user');

const { NotFoundError } = require('../errors/not-found-err');

const getCurrentProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const updateCurrentProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports = {
  getCurrentProfile,
  updateCurrentProfile,
};
