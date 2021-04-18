const User = require('../models/user');

const { NotFoundError } = require('../errors/not-found-err');

const getCurrentProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

const updateCurrentProfile = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      email: req.body.email,
      name: req.body.name,
    },
    {
      runValidators: true,
      new: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch(next);
};

module.exports = {
  getCurrentProfile,
  updateCurrentProfile,
};
