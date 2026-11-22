'use strict';

const express = require('express');
const controller = require('../controllers/choices.controller');
const validate = require('../middlewares/validate');
const {
  idParamValidator,
  listChoicesValidator,
  createChoiceValidator,
  updateChoiceValidator,
} = require('../validators/choices.validator');

const router = express.Router();

router.get('/', listChoicesValidator, validate, controller.getAll);
router.get('/:id', idParamValidator, validate, controller.getById);
router.post('/', createChoiceValidator, validate, controller.create);
router.patch('/:id', updateChoiceValidator, validate, controller.update);
router.put('/:id', updateChoiceValidator, validate, controller.update);
router.delete('/:id', idParamValidator, validate, controller.remove);

module.exports = router;
