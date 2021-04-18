const usersRouter = require('express').Router();

const { getCurrentProfile, updateCurrentProfile } = require('../controllers/users');

usersRouter.get('/me', getCurrentProfile);
usersRouter.patch('/me', updateCurrentProfile);

module.exports = usersRouter;
