'use strict';

const usersService = require('../services/users.service');

async function create(req, res, next) {
  try {
    const user = await usersService.createUser(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const user = await usersService.getUserById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
}

async function list(req, res, next) {
  try {
    const users = await usersService.listUsers();
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  create,
  getById,
  list,
};
