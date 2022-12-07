module.exports = {
  origin: [
    'http://localhost:3006',
    'https://mesto.koshinva.nomoredomains.club',
    'http://mesto.koshinva.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
