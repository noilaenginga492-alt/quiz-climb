'use strict';

const { validationResult } = require('express-validator');
const { AppError } = require('../errors/app-error');

function validate(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const details = result.array().map((err) => ({
      field: err.path || err.param || 'body',
      message: err.msg
    }));
    return next(new AppError('Validation failed', 400, details, 'VALIDATION_FAILED'));
  }
  return next();
}

module.exports = validate;
