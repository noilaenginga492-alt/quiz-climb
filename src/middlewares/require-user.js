'use strict';

const { AppError } = require('../errors/app-error');

function requireUser(...allowedRoles) {
  return function guard(req, res, next) {
    if (!req.user) {
      return next(
        new AppError(
          'Say who you are first: send the X-Demo-User header.',
          401,
          null,
          'AUTH_REQUIRED'
        )
      );
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Only these roles may do this: ${allowedRoles.join(', ')}.`,
          403,
          null,
          'FORBIDDEN'
        )
      );
    }

    return next();
  };
}

module.exports = requireUser;
