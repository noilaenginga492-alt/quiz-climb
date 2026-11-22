'use strict';

const express = require('express');
const sessionsController = require('../controllers/game-sessions.controller');
const playersController = require('../controllers/players.controller');
const validate = require('../middlewares/validate');
const {
  sessionIdParamValidator,
  createSessionValidator,
  updateSessionValidator,
  joinSessionValidator,
} = require('../validators/sessions.validator');

const router = express.Router();

router.get('/', sessionsController.index);
router.get('/:id', sessionIdParamValidator, validate, sessionsController.show);
router.post('/', createSessionValidator, validate, sessionsController.store);
router.patch('/:id', updateSessionValidator, validate, sessionsController.update);
router.put('/:id', updateSessionValidator, validate, sessionsController.update);
router.delete('/:id', sessionIdParamValidator, validate, sessionsController.destroy);

router.post('/:code/players', joinSessionValidator, validate, playersController.join);

module.exports = router;
