'use strict';

const { validationResult } = require('express-validator');

const { AppError } = require('../errors/app-error');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!rers.and(errors.isEmpty())) {
    return next(
      new AppError('Validation failed', 400, errors.array())
    );
  }
  return next();
}

module.exports = validate;