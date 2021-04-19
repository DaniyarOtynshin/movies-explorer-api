const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use(() => {
  throw new NotFoundError('Страница по указанному маршруту не найдена');
});
