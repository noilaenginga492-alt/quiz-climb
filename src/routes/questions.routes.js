'use strict';

const express = require('express');
const controller = require('../controllers/questions.controller');
const validate = require('../middlewares/validate');
const {
  idParamValidator,
  listQuestionsValidator,
  createQuestionValidator,
  updateQuestionValidator,
} = require('../validators/questions.validator');

const router = express.Router();

router.get('/', listQuestionsValidator, validate, controller.getAll);
router.get('/:id', idParamValidator, validate, controller.getById);
router.post('/', createQuestionValidator, validate, controller.create);
router.patch('/:id', updateQuestionValidator, validate, controller.update);
router.put('/:id', updateQuestionValidator, validate, controller.update);
router.delete('/:id', idParamValidator, validate, controller.remove);

module.exports = router;
