'use strict';

const { matchedData } = require('express-validator');
const questionSetsService = require('../services/question-sets.service');

function toJson(questionSet) {
  const raw = questionSet && questionSet.toJSON ? questionSet.toJSON() : questionSet;
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    user_id: raw.user_id,
    created_at: raw.created_at,
    updated_at: raw.updated_at
  };
}

async function getAll(req, res, next) {
  try {
    const items = await questionSetsService.getAllQuestionSets();
    return res.status(200).json({ data: items.map(toJson) });
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = matchedData(req, { locations: ['params'] });
    const item = await questionSetsService.getQuestionSetById(id);
    return res.status(200).json({ data: toJson(item) });
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const data = matchedData(req, { locations: ['body'] });
    const created = await questionSetsService.createQuestionSet(data, req.user);
    return res.status(201).json({ data: toJson(created) });
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const { id } = matchedData(req, { locations: ['params'] });
    const data = matchedData(req, { locations: ['body'] });
    const updated = await questionSetsService.updateQuestionSetById(id, data, req.user);
    return res.status(200).json({ data: toJson(updated) });
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = matchedData(req, { locations: ['params'] });
    await questionSetsService.deleteQuestionSetById(id, req.user);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
