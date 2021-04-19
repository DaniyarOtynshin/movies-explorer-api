const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose');
const { isURL } = require('validator');

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string.required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const validateNewUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const validateMoviesBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.empty': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'string.empty': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'string.empty': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'string.empty': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'string.empty': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Поле "image" должно быть url-адресом');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Поле "trailer" должно быть url-адресом');
    }),
    thimbnail: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message('Поле "thimbnail" должно быть url-адресом');
    }),
    owner: Joi.string().alphanum().hex().length(24),
    movieId: Joi.string().alphanum().hex().length(24),
    nameRU: Joi.string().required()
      .messages({
        'string.empty': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.empty': 'Поле "nameEN" должно быть заполнено',
      }),
  }),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateAuth,
  validateId,
  validateUserBody,
  validateNewUserBody,
  validateMoviesBody,
};
