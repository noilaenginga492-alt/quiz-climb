'use strict';

const express = require('express');
const controller = require('../controllers/question-sets.controller');
const validate = require('../middlewares/validate');
const {
  idParamValidator,
  createQuestionSetValidator,
  updateQuestionSetValidator,
} = require('../validators/question-sets.validator');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', idParamValidator, validate, controller.getById);
router.post('/', createQuestionSetValidator, validate, controller.create);
router.patch('/:id', updateQuestionSetValidator, validate, controller.update);
router.put('/:id', updateQuestionSetValidator, validate, controller.update);
router.delete('/:id', idParamValidator, validate, controller.remove);

module.exports = router;
