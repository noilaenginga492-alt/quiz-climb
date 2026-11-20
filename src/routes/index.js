'use strict';

const express = require('express');
const questionSetsRoutes = require('./question-sets.routes');

const router = express.Router();

router.use('/question-sets', questionSetsRoutes);

module.exports = router;
