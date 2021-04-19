const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-error');
const ValidationError = require('../errors/validation-err');

const getMovies = (req, res, next) => Movie.find({})
  .orFail(() => {
    throw new NotFoundError('Фильмы не найдены');
  })
  .then((movies) => res.status(200).send(movies))
  .catch(next);

const addMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params.id })
    .orFail(() => {
      throw new NotFoundError('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Невозможно удалить чужой фильм');
      }
      Movie.deleteOne({ _id: req.params.id })
        .then((response) => {
          if (!req.params.movieId) {
            throw new ValidationError('Id фильма невалидный');
          }
          if (response.n === 0) {
            throw new NotFoundError('Фильм не найден');
          }
          return res.status(200).send(response);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
