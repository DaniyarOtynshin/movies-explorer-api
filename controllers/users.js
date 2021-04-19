const User = require('../models/user');

const { NotFoundError } = require('../errors/not-found-err');

const saltRounds = 10;

const getCurrentProfile = (req, res, next) => {
  User.findById(req.user._id)
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

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(SUCCESS_CODE_200).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Email уже занят'));
      }
      next(err);
    });
};

module.exports = {
  createUser,
  getCurrentProfile,
  updateCurrentProfile,
};
