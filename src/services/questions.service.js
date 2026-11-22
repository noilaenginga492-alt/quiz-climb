'use strict';

const questionsRepository = require('../repositories/questions.repository');
const questionSetsRepository = require('../repositories/question-sets.repository');
const { AppError } = require('../errors/app-error');

async function listQuestions(questionSetId) {
  if (questionSetId !== undefined) {
    return questionsRepository.findAllByQuestionSetId(questionSetId);
  }
  return questionsRepository.findAll();
}

async function getQuestionById(id) {
  const question = await questionsRepository.findById(id);
  if (!question) {
    throw new AppError('Question not found', 404);
  }
  return question;
}

async function createQuestion({ question_text, question_set_id }) {
  const questionSet = await questionSetsRepository.findById(question_set_id);
  if (!questionSet) {
    throw new AppError('Question set not found', 404);
  }

  return questionsRepository.create({
    question_text,
    question_set_id,
  });
}

async function updateQuestion(id, data) {
  if (data.question_set_id !== undefined) {
    const questionSet = await questionSetsRepository.findById(data.question_set_id);
    if (!questionSet) {
      throw new AppError('Question set not found', 404);
    }
  }

  const updated = await questionsRepository.updateById(id, data);
  if (!updated) {
    throw new AppError('Question not found', 404);
  }
  return updated;
}

async function deleteQuestion(id) {
  const deleted = await questionsRepository.deleteById(id);
  if (!deleted) {
    throw new AppError('Question not found', 404);
  }
  return { deleted: true };
}

module.exports = {
  listQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
