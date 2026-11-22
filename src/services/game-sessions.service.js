'use strict';

const crypto = require('crypto');
const gameSessionsRepository = require('../repositories/game-sessions.repository');
const { AppError } = require('../errors/app-error');

function generateSessionCode() {
  const num = crypto.randomInt(0, 1000000);
  return String(num).padStart(6, '0');
}

function getCallerId(user) {
  if (!user) return null;
  return user.user_id !== undefined && user.user_id !== null ? user.user_id : user.id;
}

async function getAllSessions() {
  return gameSessionsRepository.findAll();
}

async function getSessionByCode(code) {
  const session = await gameSessionsRepository.findByCode(String(code));
  if (!session) {
    throw new AppError('Game session not found', 404, null, 'SESSION_NOT_FOUND');
  }
  return session;
}

async function createSession(data, user) {
  const callerId = getCallerId(user);
  let code = generateSessionCode();
  while (await gameSessionsRepository.findByCode(code)) {
    code = generateSessionCode();
  }

  const payload = {
    question_set_id: data.question_set_id,
    user_id: callerId,
    session_code: code,
    status: data.status || 'waiting'
  };

  return gameSessionsRepository.create(payload);
}

async function updateSessionByCode(code, data, user) {
  const existing = await getSessionByCode(code);
  const callerId = getCallerId(user);

  if (user && user.role !== 'ADMIN' && Number(existing.user_id) !== Number(callerId)) {
    throw new AppError('Only the host or admin may update this session.', 403, null, 'FORBIDDEN');
  }

  const changes = {};
  if (data.status !== undefined) changes.status = data.status;

  const updated = await gameSessionsRepository.updateById(existing.id, changes);
  if (!updated) {
    throw new AppError('Game session not found', 404, null, 'SESSION_NOT_FOUND');
  }
  return updated;
}

module.exports = {
  getAllSessions,
  getSessionByCode,
  createSession,
  updateSessionByCode
};
