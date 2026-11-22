'use strict';

const { QuestionSet } = require('../models');

async function findAll() {
  return QuestionSet.findAll({
    order: [['id', 'ASC']],
  });
}

async function findById(id) {
  return QuestionSet.findByPk(id);
}

async function create(data) {
  return QuestionSet.create(data);
}

async function updateById(id, data) {
  const record = await QuestionSet.findByPk(id);
  if (!record) return null;
  return record.update(data);
}

async function deleteById(id) {
  const record = await QuestionSet.findByPk(id);
  if (!record) return null;
  await record.destroy();
  return true;
}

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};