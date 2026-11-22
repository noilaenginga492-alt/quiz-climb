'use strict';

const { body, param, query } = require('express-validator');
const validate = require('../middlewares/validate');

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('id must be a positive integer')
    .toInt(),
];

const listQuestionsValidator = [
  query('question_set_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('question_set_id must be a positive integer')
    .toInt(),
  validate,
];

const createQuestionValidator = [
  body('question_text')
    .trim()
    .notEmpty()
    .withMessage('question_text is required')
    .isString()
    .withMessage('question_text must be a string'),
  body('question_set_id')
    .notEmpty()
    .withMessage('question_set_id is required')
    .isInt({ min: 1 })
    .withMessage('question_set_id must be a positive integer')
    .toInt(),
  validate,
];

const updateQuestionValidator = [
  ...idParamValidator,
  body('question_text')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('question_text cannot be empty')
    .isString()
    .withMessage('question_text must be a string'),
  body('question_set_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('question_set_id must be a positive integer')
    .toInt(),
  validate,
];

module.exports = {
  idParamValidator,
  listQuestionsValidator,
  createQuestionValidator,
  updateQuestionValidator,
};
