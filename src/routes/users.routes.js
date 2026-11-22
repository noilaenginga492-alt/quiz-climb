'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');
const {
  createUserValidation,
  getUserByIdValidation,
} = require('../validators/users.validator');

const router = express.Router();

router.post('/', createUserValidation, usersController.create);
router.get('/', usersController.list);
router.get('/:id', getUserByIdValidation, usersController.getById);

module.exports = router;
