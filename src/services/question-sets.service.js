'use strict';

const questionSetsRepository = require('../repositories/question-sets.repository');
const { AppError } = require('../errors/app-error');

function getCallerId(user) {
  if (!user) return null;
  return user.user_id !== undefined && user.user_id !== null ? user.user_id : user.id;
}

function canManageSet(questionSet, user) {
  if (!user) return false;
  if (user.role === 'ADMIN') return true;
  const callerId = getCallerId(user);
  return callerId !== null && Number(questionSet.user_id) === Number(callerId);
}

async function findOrFail(id) {
  const item = await questionSetsRepository.findById(Number(id));
  if (!item) {
    throw new AppError(`No question set has the id ${id}.`, 404, null, 'QUESTION_SET_NOT_FOUND');
  }
  return item;
}

async function getAllQuestionSets() {
  return questionSetsRepository.findAll();
}

async function getQuestionSetById(id) {
  return findOrFail(id);
}

async function createQuestionSet(data, user) {
  const callerId = getCallerId(user);
  const payload = {
    title: data.title,
    description: data.description !== undefined ? data.description : null,
    user_id: callerId
  };
  return questionSetsRepository.create(payload);
}

async function updateQuestionSetById(id, data, user) {
  const existing = await findOrFail(id);
  if (!canManageSet(existing, user)) {
    throw new AppError('This question set belongs to another host.', 403, null, 'FORBIDDEN');
  }

  const changes = {};
  if (data.title !== undefined) changes.title = data.title;
  if (data.description !== undefined) changes.description = data.description;

  const updated = await questionSetsRepository.updateById(Number(id), changes);
  if (!updated) {
    throw new AppError(`No question set has the id ${id}.`, 404, null, 'QUESTION_SET_NOT_FOUND');
  }
  return updated;
}

async function deleteQuestionSetById(id, user) {
  const existing = await findOrFail(id);
  if (!canManageSet(existing, user)) {
    throw new AppError('This question set belongs to another host.', 403, null, 'FORBIDDEN');
  }

  const deleted = await questionSetsRepository.deleteById(Number(id));
  if (!deleted) {
    throw new AppError(`No question set has the id ${id}.`, 404, null, 'QUESTION_SET_NOT_FOUND');
  }
  return { deleted: true };
}

module.exports = {
  getAllQuestionSets,
  getQuestionSetById,
  createQuestionSet,
  updateQuestionSetById,
  deleteQuestionSetById
};
