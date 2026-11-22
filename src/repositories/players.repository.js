'use strict';

const { Player } = require('../models');

async function findBySessionAndUser(gameSessionId, userId) {
  return Player.findOne({
    where: {
      game_session_id: gameSessionId,
      user_id: userId,
    },
  });
}

async function findActiveByUserId(userId) {
  return Player.findOne({
    where: { user_id: userId },
    order: [['id', 'DESC']],
  });
}

async function create(data) {
  return Player.create(data);
}

async function countBySessionId(gameSessionId) {
  return Player.count({
    where: { game_session_id: gameSessionId },
  });
}

module.exports = {
  findBySessionAndUser,
  findActiveByUserId,
  create,
  countBySessionId,
};
