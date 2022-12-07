const jwt = require('jsonwebtoken');
const UnsanctionedError = require('../utils/errors/unsanctionedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnsanctionedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : 'd64d65e6118d6d38fc8fcf943b81f953',
    );
  } catch (error) {
    return next(new UnsanctionedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
