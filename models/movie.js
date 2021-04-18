const { Schema, ObjectId, model } = require('mongoose');

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (v) => /^(http(s)?):\/\/(www.)?[a-zA-Z0-9-._~:/?#@!$&'()*+,;=]($#)?/.test(v),
      message: 'Поле "image" должно быть валидным URL-адресом',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле "trailer" должно быть заполнено'],
    validate: {
      validator: (v) => /^(http(s)?):\/\/(www.)?[a-zA-Z0-9-._~:/?#@!$&'()*+,;=]($#)?/.test(v),
      message: 'Поле "trailer" должно быть валидным URL-адресом',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => /^(http(s)?):\/\/(www.)?[a-zA-Z0-9-._~:/?#@!$&'()*+,;=]($#)?/.test(v),
      message: 'Поле "thumbnail" должно быть валидным URL-адресом',
    },
  },
  owner: {
    type: ObjectId,
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  movieId: {
    type: ObjectId,
    required: [true, 'Поле "movieId" должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },
});

module.exports = model('movie', movieSchema);
