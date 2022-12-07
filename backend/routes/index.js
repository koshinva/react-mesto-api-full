const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { login, addUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const routeUsers = require('./users');
const routeCards = require('./cards');
const NotFoundError = require('../utils/errors/notFoundError');
const regexUrl = require('../utils/regularExpressions');
const corsOptions = require('../utils/corsOptions');

router.use(cors(corsOptions));

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(regexUrl),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  addUser,
);
router.use(auth);
router.use('/users', routeUsers);
router.use('/cards', routeCards);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
router.all('/*', (req, res, next) => {
  next(new NotFoundError('Неправильно указан путь'));
});

module.exports = router;
