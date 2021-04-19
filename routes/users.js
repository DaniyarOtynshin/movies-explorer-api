const usersRouter = require('express').Router();

const { getCurrentProfile, updateCurrentProfile } = require('../controllers/users');
const { validateUserBody } = require('../middlewares/validators');

usersRouter.get('/me', getCurrentProfile);
usersRouter.patch('/me', validateUserBody, updateCurrentProfile);

module.exports = usersRouter;
