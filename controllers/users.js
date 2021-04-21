const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-error');

const { JWT_SECRET } = require('../config');

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
    .then((user) => {
      res.status(200).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        const error = new ConflictError('Email уже занят');
        next(error);
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        const error = new ConflictError('Email уже занят');
        next(error);
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
  getCurrentProfile,
  updateCurrentProfile,
};
