'use strict';

const { User } = require('../models');

async function findById(id) {
  return User.findByPk(id);
}

async function findByUsername(username) {
  return User.findOne({
    where: { username },
  });
}

async function create(data) {
  return User.create(data);
}

async function findAll() {
  return User.findAll({
    order: [['id', 'ASC']],
  });
}

module.exports = {
  findById,
  findByUsername,
  create,
  findAll,
};
