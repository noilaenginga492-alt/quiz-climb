'use strict';

const { matchedData } = require('express-validator');
const playersService = require('../services/players.service');

function playerToJson(player) {
  const raw = player && player.toJSON ? player.toJSON() : player;
  return {
    id: raw.id,
    game_session_id: raw.game_session_id,
    user_id: raw.user_id,
    score: raw.score,
    created_at: raw.created_at,
    updated_at: raw.updated_at
  };
}

async function join(req, res, next) {
  try {
    const { code } = matchedData(req, { locations: ['params'] });
    const result = await playersService.joinSessionByCode(code, req.user);
    const statusCode = result.rejoined ? 200 : 201;
    return res.status(statusCode).json({
      rejoined: result.rejoined,
      data: playerToJson(result.player)
    });
  } catch (err) {
    return next(err);
  }
}

async function list(req, res, next) {
  try {
    const { code } = matchedData(req, { locations: ['params'] });
    const players = await playersService.listPlayersByCode(code);
    return res.status(200).json({ data: players.map(playerToJson) });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  join,
  list
};
