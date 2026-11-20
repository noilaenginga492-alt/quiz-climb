'use strict';

const questionSetsRepository = require('../repositories/question-sets.repository');
const { AppError } = require('../errors/app-error');

async function getAllQuestionSets() {
  return questionSetsRepository.findAll();
}

async function getQuestionSetById(id) {
  const item = await questionSetsRepository.findById(id);
  if (!item) throw new AppError('Question set not found', 404);
  return item;
}

async function createQuestionSet(data) {
  return questionSetsRepository.create(data);
}

async function updateQuestionSetById(id, data) {
  const updated = await questionSetsRepository.updateById(id, data);
  if (!updated) throw new AppError('Question set not found', 404);
  return updated;
}

async function deleteQuestionSetById(id) {
  const deleted = await questionSetsRepository.deleteById(id);
  if (!deleted) throw new AppError('Question set not found', 404);
  return { deleted: true };
}

module.exports = {
  getAllQuestionSets,
  getQuestionSetById,
  createQuestionSet,
  updateQuestionSetById,
  deleteQuestionSetById,
};