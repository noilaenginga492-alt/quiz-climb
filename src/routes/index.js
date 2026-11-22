'use strict';

const express = require('express');
const questionSetsRoutes = require('./question-sets.routes');
const sessionsRoutes = require('./sessions.routes');

const router = express.Router();

router.use('/question-sets', questionSetsRoutes);
router.use('/sessions', sessionsRoutes);

module.exports = router;
