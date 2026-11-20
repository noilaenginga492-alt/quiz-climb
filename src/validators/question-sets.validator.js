'use strict';

const { body, param } = require('express-validator');

const idParamValidator = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
];

const createQuestionSetValidator = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('title is required')
    .bail()
    .isString()
    .withMessage('title must be a string')
    .trim()
    .notEmpty()
    .withMessage('title must not be empty'),
  body('description')
    .optional({ nullable: true })
    .isString()
    .withMessage('description must be a string'),
  body('user_id')
    .exists({ checkFalsy: true })
    .withMessage('user_id is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('user_id must be a positive integer'),
];

const updateQuestionSetValidator = [
  ...idParamValidator,
  body('title')
    .optional()
    .isString()
    .withMessage('title must be a string')
    .trim()
    .notEmpty()
    .withMessage('title must not be empty'),
  body('description')
    .optional({ nullable: true })
    .isString()
    .withMessage('description must be a string'),
  body('user_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('user_id must be a positive integer'),
];

module.exports = {
  idParamValidator,
  createQuestionSetValidator,
  updateQuestionSetValidator,
};
