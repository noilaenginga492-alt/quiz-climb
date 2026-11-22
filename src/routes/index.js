'use strict';

const express = require('express');
const questionSetsRoutes = require('./question-sets.routes');
const sessionsRoutes = require('./sessions.routes');
const usersRoutes = require('./users.routes');

const router = express.Router();

router.use('/question-sets', questionSetsRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
