'use strict';

const questionSetsService = require('../services/question-sets.service');

async function getAll(req, res, next) {
  try {
    const items = await questionSetsService.getAllQuestionSets();
    return res.status(200).json({ data: items });
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const item = await questionSetsService.getQuestionSetById(req.params.id);
    return res.status(200).json({ data: item });
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const created = await questionSetsService.createQuestionSet(req.body);
    return res.status(201).json({ data: created });
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const updated = await questionSetsService.updateQuestionSetById(req.params.id, req.body);
    return res.status(200).json({ data: updated });
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const result = await questionSetsService.deleteQuestionSetById(req.params.id);
    return res.status(200).json({ data: result });
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
