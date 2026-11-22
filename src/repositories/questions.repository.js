'use strict';

const { Question } = require('../models');

async function findAll() {
  return Question.findAll({
    order: [['id', 'ASC']],
  });
}

async function findAllByQuestionSetId(questionSetId) {
  return Question.findAll({
    where: { question_set_id: questionSetId },
    order: [['id', 'ASC']],
  });
}

async function findById(id) {
  return Question.findByPk(id);
}

async function create(data) {
  return Question.create(data);
}

async function updateById(id, data) {
  const record = await Question.findByPk(id);
  if (!record) return null;
  return record.update(data);
}

async function deleteById(id) {
  const record = await Question.findByPk(id);
  if (!record) return null;
  await record.destroy();
  return true;
}

module.exports = {
  findAll,
  findAllByQuestionSetId,
  findById,
  create,
  updateById,
  deleteById,
};
