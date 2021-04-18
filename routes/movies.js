const moviesRouter = require('express').Router();

moviesRouter.get('/', getMovies);
moviesRouter.post('/', addMovie);
moviesRouter.delete('/movieId', deleteMovie);

module.exports = moviesRouter;
