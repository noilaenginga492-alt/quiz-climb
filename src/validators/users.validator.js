'use strict';

const { body, param } = require('express-validator');
const validate = require('../middlewares/validate');

const createUserValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .isString()
    .withMessage('username must be a string')
    .isLength({ min: 1, max: 24 })
    .withMessage('username must be at most 24 characters'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isString()
    .withMessage('password must be a string')
    .isLength({ min: 4 })
    .withMessage('password must be at least 4 characters'),
  body('role')
    .optional()
    .isString()
    .withMessage('role must be a string')
    .isIn(['player', 'host', 'admin'])
    .withMessage('role is invalid'),
  validate,
];

const getUserByIdValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('id must be a positive integer')
    .toInt(),
  validate,
];

module.exports = {
  createUserValidation,
  getUserByIdValidation,
};
