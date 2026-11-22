'use strict';

const gameSessionsRepository = require('../repositories/game-sessions.repository');
const playersRepository = require('../repositories/players.repository');
const gameInfo = require('../config/game-info');
const { AppError } = require('../errors/app-error');

async function joinSessionByCode(sessionCode, userId) {
  const session = await gameSessionsRepository.findByCode(sessionCode);
  if (!session) {
    throw new AppError('Game session not found', 404);
  }

  if (session.status !== 'waiting') {
    throw new AppError('Cannot join a session that is not waiting', 400);
  }

  const existingPlayer = await playersRepository.findBySessionAndUser(
    session.id,
    userId
  );
  if (existingPlayer) {
    throw new AppError('Player is already in this session', 409);
  }

  const playerCount = await playersRepository.countBySessionId(session.id);
  if (playerCount >= gameInfo.max_players) {
    throw new AppError('Game session is full', 400);
  }

  return playersRepository.create({
    game_session_id: session.id,
    user_id: userId,
    score: 0,
  });
}

module.exports = {
  joinSessionByCode,
};
