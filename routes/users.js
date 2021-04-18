const usersRouter = require('express').Router();

usersRouter.get('/me', getCurrentProfile);
usersRouter.patch('/me', updateCurrentProfile);

export default usersRouter;