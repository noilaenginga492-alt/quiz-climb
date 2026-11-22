'use strict';

const { body, param, query } = require('express-validator');
const validate = require('../middlewares/validate');

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('id must be a positive integer')
    .toInt(),
];

const listChoicesValidator = [
  query('question_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('question_id must be a positive integer')
    .toInt(),
  validate,
];

const createChoiceValidator = [
  body('choice_text')
    .trim()
    .notEmpty()
    .withMessage('choice_text is required')
    .isString()
    .withMessage('choice_text must be a string'),
  body('is_correct')
    .optional()
    .isBoolean()
    .withMessage('is_correct must be a boolean')
    .toBoolean(),
  body('question_id')
    .notEmpty()
    .withMessage('question_id is required')
    .isInt({ min: 1 })
    .withMessage('question_id must be a positive integer')
    .toInt(),
  validate,
];

const updateChoiceValidator = [
  ...idParamValidator,
  body('choice_text')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('choice_text cannot be empty')
    .isString()
    .withMessage('choice_text must be a string'),
  body('is_correct')
    .optional()
    .isBoolean()
    .withMessage('is_correct must be a boolean')
    .toBoolean(),
  body('question_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('question_id must be a positive integer')
    .toInt(),
  validate,
];

module.exports = {
  idParamValidator,
  listChoicesValidator,
  createChoiceValidator,
  updateChoiceValidator,
};
