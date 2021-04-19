const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateAuth } = require('../middlewares/validators');
const { validateNewUserBody } = require('../middlewares/validators');

router.post('/signup', validateNewUserBody, createUser);
router.post('/signin', validateAuth, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use(() => {
  throw new NotFoundError('Страница по указанному маршруту не найдена');
});

module.exports = router;
