'use strict';

const { body, param } = require('express-validator');

const sessionIdParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('id must be a positive integer'),
];

const sessionCodeParamValidator = [
  param('code')
    .exists({ checkFalsy: true })
    .withMessage('code is required')
    .bail()
    .isString()
    .withMessage('code must be a string')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('code must be between 1 and 10 characters'),
];

const createSessionValidator = [
  body('question_set_id')
    .exists({ checkFalsy: true })
    .withMessage('question_set_id is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('question_set_id must be a positive integer'),
  body('user_id')
    .exists({ checkFalsy: true })
    .withMessage('user_id is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('user_id must be a positive integer'),
  body('session_code')
    .optional()
    .isString()
    .withMessage('session_code must be a string')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('session_code must be at most 10 characters'),
  body('status')
    .optional()
    .isString()
    .withMessage('status must be a string')
    .trim()
    .notEmpty()
    .withMessage('status must not be empty'),
];

const updateSessionValidator = [
  ...sessionIdParamValidator,
  body('status')
    .optional()
    .isString()
    .withMessage('status must be a string')
    .trim()
    .notEmpty()
    .withMessage('status must not be empty'),
  body('question_set_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('question_set_id must be a positive integer'),
];

const joinSessionValidator = [
  ...sessionCodeParamValidator,
  body('user_id')
    .exists({ checkFalsy: true })
    .withMessage('user_id is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('user_id must be a positive integer'),
];

module.exports = {
  sessionIdParamValidator,
  sessionCodeParamValidator,
  createSessionValidator,
  updateSessionValidator,
  joinSessionValidator,
};
