'use strict';

const express = require('express');
const controller = require('../controllers/question-sets.controller');
const validate = require('../middlewares/validate');
const requireUser = require('../middlewares/require-user');
const {
  idParamValidator,
  createQuestionSetValidator,
  updateQuestionSetValidator
} = require('../validators/question-sets.validator');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', idParamValidator, validate, controller.getById);
router.post('/', requireUser('HOST', 'ADMIN'), createQuestionSetValidator, validate, controller.create);
router.patch(
  '/:id',
  requireUser('HOST', 'ADMIN'),
  idParamValidator,
  updateQuestionSetValidator,
  validate,
  controller.update
);
router.put(
  '/:id',
  requireUser('HOST', 'ADMIN'),
  idParamValidator,
  updateQuestionSetValidator,
  validate,
  controller.update
);
router.delete('/:id', requireUser('HOST', 'ADMIN'), idParamValidator, validate, controller.remove);

module.exports = router;
