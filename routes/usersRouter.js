const { Router } = require('express');
const usersRouter = Router();
const usersControllers = require('../controllers/usersControllers');


usersRouter.get('/order', usersControllers.getAuthors)
usersRouter.get('/createMessage', usersControllers.createAuthorGet)
usersRouter.post('/createMessage', usersControllers.createAuthorPost)

module.exports = usersRouter;
