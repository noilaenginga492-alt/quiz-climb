'use strict';

const express = require('express');
const sessionsController = require('../controllers/game-sessions.controller');
const playersController = require('../controllers/players.controller');
const validate = require('../middlewares/validate');
const requireUser = require('../middlewares/require-user');
const {
  sessionCodeParamValidator,
  createSessionValidator,
  updateSessionValidator,
  joinSessionValidator
} = require('../validators/sessions.validator');

const router = express.Router();

router.get('/', sessionsController.index);
router.get('/:code', sessionCodeParamValidator, validate, sessionsController.show);
router.post('/', requireUser('HOST', 'ADMIN'), createSessionValidator, validate, sessionsController.store);
router.patch(
  '/:code',
  requireUser('HOST', 'ADMIN'),
  sessionCodeParamValidator,
  updateSessionValidator,
  validate,
  sessionsController.updateStatus
);
router.put(
  '/:code',
  requireUser('HOST', 'ADMIN'),
  sessionCodeParamValidator,
  updateSessionValidator,
  validate,
  sessionsController.updateStatus
);

router.get('/:code/players', sessionCodeParamValidator, validate, playersController.list);
router.post('/:code/players', requireUser(), joinSessionValidator, validate, playersController.join);

module.exports = router;
