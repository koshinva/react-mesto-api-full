const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const IncorrectDataError = require('../utils/errors/incorrectDataError');
const NotFoundError = require('../utils/errors/notFoundError');
const RequestConflictError = require('../utils/errors/requestConflictError');
const {
  STATUS_CODE_201,
} = require('../utils/errors/statusCode');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError(`Пользователь с указанным ${userId} не найден`);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Введён некорректный ID'));
        return;
      }
      next(err);
    });
};
module.exports.addUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 12).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        res.status(STATUS_CODE_201).send({
          data: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          },
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(
            new RequestConflictError(
              'Пользователь с указанным email уже зарегистрирован',
            ),
          );
          return;
        }
        if (err.name === 'ValidationError') {
          next(
            new IncorrectDataError(
              'Переданы некорректные данные при создании пользователя',
            ),
          );
          return;
        }
        next(err);
      });
  }).catch(next);
};
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
      throw new NotFoundError(
        `Пользователь с указанным ${req.user._id} не найден`,
      );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new IncorrectDataError(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
        return;
      }
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Введён некорректный ID'));
        return;
      }
      next(err);
    });
};
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
      throw new NotFoundError(
        `Пользователь с указанным ${req.user._id} не найден`,
      );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new IncorrectDataError(
            'Переданы некорректные данные при обновлении аватара',
          ),
        );
        return;
      }
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Введён некорректный ID'));
        return;
      }
      next(err);
    });
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production'
          ? JWT_SECRET
          : 'd64d65e6118d6d38fc8fcf943b81f953',
        {
          expiresIn: '7d',
        },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: 'Успешная авторизация' });
    })
    .catch(next);
};
module.exports.getInfoAboutCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
