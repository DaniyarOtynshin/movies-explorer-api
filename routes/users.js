const usersRouter = require('express').Router();

const { getCurrentProfile, updateCurrentProfile } = require('../controllers/users');
const { validateUsersBody } = require('../middlewares/validators');

usersRouter.get('/me', getCurrentProfile);
usersRouter.patch('/me', validateUsersBody, updateCurrentProfile);

module.exports = usersRouter;
