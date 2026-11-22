'use strict';

const { Choice } = require('../models');

async function findAll() {
  return Choice.findAll({
    order: [['id', 'ASC']],
  });
}

async function findAllByQuestionId(questionId) {
  return Choice.findAll({
    where: { question_id: questionId },
    order: [['id', 'ASC']],
  });
}

async function findById(id) {
  return Choice.findByPk(id);
}

async function create(data) {
  return Choice.create(data);
}

async function updateById(id, data) {
  const record = await Choice.findByPk(id);
  if (!record) return null;
  return record.update(data);
}

async function deleteById(id) {
  const record = await Choice.findByPk(id);
  if (!record) return null;
  await record.destroy();
  return true;
}

module.exports = {
  findAll,
  findAllByQuestionId,
  findById,
  create,
  updateById,
  deleteById,
};
