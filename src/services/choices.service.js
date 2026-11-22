'use strict';

const choicesRepository = require('../repositories/choices.repository');
const questionsRepository = require('../repositories/questions.repository');
const { AppError } = require('../errors/app-error');

async function listChoices(questionId) {
  if (questionId !== undefined) {
    return choicesRepository.findAllByQuestionId(questionId);
  }
  return choicesRepository.findAll();
}

async function getChoiceById(id) {
  const choice = await choicesRepository.findById(id);
  if (!choice) {
    throw new AppError('Choice not found', 404);
  }
  return choice;
}

async function createChoice({ choice_text, is_correct, question_id }) {
  const question = await questionsRepository.findById(question_id);
  if (!question) {
    throw new AppError('Question not found', 404);
  }

  const payload = {
    choice_text,
    question_id,
  };

  if (is_correct !== undefined) {
    payload.is_correct = is_correct;
  }

  return choicesRepository.create(payload);
}

async function updateChoice(id, data) {
  if (data.question_id !== undefined) {
    const question = await questionsRepository.findById(data.question_id);
    if (!question) {
      throw new AppError('Question not found', 404);
    }
  }

  const updated = await choicesRepository.updateById(id, data);
  if (!updated) {
    throw new AppError('Choice not found', 404);
  }
  return updated;
}

async function deleteChoice(id) {
  const deleted = await choicesRepository.deleteById(id);
  if (!deleted) {
    throw new AppError('Choice not found', 404);
  }
  return { deleted: true };
}

module.exports = {
  listChoices,
  getChoiceById,
  createChoice,
  updateChoice,
  deleteChoice,
};
