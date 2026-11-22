'use strict';

const crypto = require('crypto');
const gameSessionsRepository = require('../repositories/game-sessions.repository');
const { AppError } = require('../errors/app-error');

function generateSessionCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

async function getAllSessions() {
  return gameSessionsRepository.findAll();
}

async function getSessionById(id) {
  const session = await gameSessionsRepository.findById(id);
  if (!session) {
    throw new AppError('Game session not found', 404);
  }
  return session;
}

async function createSession(data) {
  const payload = {
    ...data,
    session_code: data.session_code || generateSessionCode(),
    status: data.status || 'waiting',
  };
  return gameSessionsRepository.create(payload);
}

async function updateSessionById(id, data) {
  const updated = await gameSessionsRepository.updateById(id, data);
  if (!updated) {
    throw new AppError('Game session not found', 404);
  }
  return updated;
}

async function deleteSessionById(id) {
  const deleted = await gameSessionsRepository.deleteById(id);
  if (!deleted) {
    throw new AppError('Game session not found', 404);
  }
  return { deleted: true };
}

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSessionById,
  deleteSessionById,
};
