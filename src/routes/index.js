'use strict';

const express = require('express');
const currentUser = require('../middlewares/current-user');
const questionSetsRoutes = require('./question-sets.routes');
const sessionsRoutes = require('./sessions.routes');
const usersRoutes = require('./users.routes');
const questionsRoutes = require('./questions.routes');
const choicesRoutes = require('./choices.routes');

const router = express.Router();

router.use(currentUser);

router.use('/question-sets', questionSetsRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/users', usersRoutes);
router.use('/questions', questionsRoutes);
router.use('/choices', choicesRoutes);

module.exports = router;
