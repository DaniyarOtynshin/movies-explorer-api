const moviesRouter = require('express').Router();

const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { validateId, validateMoviesBody } = require('../middlewares/validators');

moviesRouter.get('/', getMovies);
moviesRouter.post('/',validateMoviesBody, addMovie);
moviesRouter.delete('/id', validateId, deleteMovie);

module.exports = moviesRouter;
