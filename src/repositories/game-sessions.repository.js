'use strict';

const { GameSession, Player } = require('../models');

async function findAll() {
  return GameSession.findAll({
    order: [['id', 'ASC']],
    include: [{ model: Player, as: 'players' }],
  });
}

async function findById(id) {
  return GameSession.findByPk(id, {
    include: [{ model: Player, as: 'players' }],
  });
}

async function findByCode(sessionCode) {
  return GameSession.findOne({
    where: { session_code: sessionCode },
    include: [{ model: Player, as: 'players' }],
  });
}

async function create(data) {
  return GameSession.create(data);
}

async function updateById(id, data) {
  const record = await GameSession.findByPk(id);
  if (!record) return null;
  return record.update(data);
}

async function deleteById(id) {
  const record = await GameSession.findByPk(id);
  if (!record) return null;
  await record.destroy();
  return true;
}

module.exports = {
  findAll,
  findById,
  findByCode,
  create,
  updateById,
  deleteById,
};
