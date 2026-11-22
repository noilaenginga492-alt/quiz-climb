'use strict';

const playersService = require('../services/players.service');

async function join(req, res, next) {
  try {
    const player = await playersService.joinSessionByCode(
      req.params.code,
      req.body.user_id
    );
    return res.status(201).json(player);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  join,
};
