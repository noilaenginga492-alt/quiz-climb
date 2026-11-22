'use strict';

const { AppError } = require('../errors/app-error');
const constraintMap = require('../errors/constraint-map');

function matchConstraint(err) {
  const haystack = [
    err && err.name,
    err && err.parent && err.parent.code,
    err && err.parent && err.parent.constraint,
    err && err.original && err.original.code,
    err && err.original && err.original.constraint,
    err && err.message,
    err && err.parent && err.parent.message
  ]
    .filter(Boolean)
    .join(' ');

  for (const [key, mapped] of Object.entries(constraintMap)) {
    if (haystack.includes(key)) {
      return mapped;
    }
  }
  return null;
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const mappedConstraint = matchConstraint(err);
  if (mappedConstraint) {
    return res.status(mappedConstraint.status).json({
      error: {
        code: mappedConstraint.code,
        message: mappedConstraint.message
      }
    });
  }

  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'The request body is not valid JSON.'
      }
    });
  }

  if (err instanceof AppError) {
    const payload = {
      error: {
        code: err.code || 'APP_ERROR',
        message: err.message
      }
    };
    if (err.details) {
      payload.error.details = err.details;
    }
    return res.status(err.statusCode).json(payload);
  }

  console.error(err);
  return res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Something went wrong on the server.'
    }
  });
}

module.exports = errorHandler;
