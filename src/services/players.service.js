'use strict';

const gameSessionsRepository = require('../repositories/game-sessions.repository');
const playersRepository = require('../repositories/players.repository');
const gameInfo = require('../config/game-info');
const { AppError } = require('../errors/app-error');

function getCallerId(user) {
  if (!user) return null;
  return user.user_id !== undefined && user.user_id !== null ? user.user_id : user.id;
}

async function joinSessionByCode(sessionCode, user) {
  const userId = getCallerId(user);
  const session = await gameSessionsRepository.findByCode(String(sessionCode));
  if (!session) {
    throw new AppError('Game session not found', 404, null, 'SESSION_NOT_FOUND');
  }

  const existingSameSession = await playersRepository.findBySessionAndUser(session.id, userId);
  if (existingSameSession) {
    return { rejoined: true, player: existingSameSession, session };
  }

  if (typeof playersRepository.findActiveByUserId === 'function') {
    const activePlayer = await playersRepository.findActiveByUserId(userId);
    if (activePlayer && Number(activePlayer.game_session_id) !== Number(session.id)) {
      const otherSession = await gameSessionsRepository.findById(activePlayer.game_session_id);
      if (otherSession && String(otherSession.status).toLowerCase() !== 'closed') {
        throw new AppError(
          'You are still playing another game. Finish it first.',
          409,
          null,
          'ALREADY_IN_GAME'
        );
      }
    }
  }

  if (String(session.status).toLowerCase() !== 'waiting') {
    throw new AppError('Session is not joinable right now.', 409, null, 'SESSION_NOT_JOINABLE');
  }

  const maxPlayers = gameInfo.max_players || 50;
  const playerCount = await playersRepository.countBySessionId(session.id);
  if (playerCount >= maxPlayers) {
    throw new AppError('This game session is full.', 409, null, 'SESSION_FULL');
  }

  const player = await playersRepository.create({
    game_session_id: session.id,
    user_id: userId,
    score: 0
  });

  return { rejoined: false, player, session };
}

async function listPlayersByCode(sessionCode) {
  const session = await gameSessionsRepository.findByCode(String(sessionCode));
  if (!session) {
    throw new AppError('Game session not found', 404, null, 'SESSION_NOT_FOUND');
  }
  return session.players || [];
}

module.exports = {
  joinSessionByCode,
  listPlayersByCode
};
