'use strict';

const usersRepository = require('../repositories/users.repository');
const { AppError } = require('../errors/app-error');

async function createUser({ username, password, role }) {
  const existing = await usersRepository.findByUsername(username);
  if (existing) {
    throw new AppError('Username already exists', 409);
  }

  const payload = {
    username,
    password,
  };

  if (role !== undefined) {
    payload.role = role;
  }

  return usersRepository.create(payload);
}

async function getUserById(id) {
  const user = await usersRepository.findById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
}

async function listUsers() {
  return usersRepository.findAll();
}

module.exports = {
  createUser,
  getUserById,
  listUsers,
};
