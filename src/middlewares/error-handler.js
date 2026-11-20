'use strict';

const { AppError } = require('../errors/app-error');

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  console.error(err);
  return res.status(500).json({
    message: 'Internal server error',
  });
}

module.exports = errorHandler;