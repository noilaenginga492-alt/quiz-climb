'use strict';

const questionsService = require('../services/questions.service');

async function getAll(req, res, next) {
  try {
    const questions = await questionsService.listQuestions(req.query.question_set_id);
    return res.status(200).json(questions);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const question = await questionsService.getQuestionById(req.params.id);
    return res.status(200).json(question);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const question = await questionsService.createQuestion(req.body);
    return res.status(201).json(question);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const question = await questionsService.updateQuestion(req.params.id, req.body);
    return res.status(200).json(question);
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const result = await questionsService.deleteQuestion(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
