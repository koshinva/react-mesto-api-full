const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getInfoAboutCurrentUser,
} = require('../controllers/users');
const regexUrl = require('../utils/regularExpressions');

router.get('/', getUsers);
router.get('/me', getInfoAboutCurrentUser);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  getUserById,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(regexUrl),
    }),
  }),
  updateAvatar,
);

module.exports = router;
