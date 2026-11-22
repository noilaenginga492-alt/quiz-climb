'use strict';

const choicesService = require('../services/choices.service');

async function getAll(req, res, next) {
  try {
    const choices = await choicesService.listChoices(req.query.question_id);
    return res.status(200).json(choices);
  } catch (err) {
    return next(err);
  }
}

async function getById(req, res, next) {
  try {
    const choice = await choicesService.getChoiceById(req.params.id);
    return res.status(200).json(choice);
  } catch (err) {
    return next(err);
  }
}

async function create(req, res, next) {
  try {
    const choice = await choicesService.createChoice(req.body);
    return res.status(201).json(choice);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const choice = await choicesService.updateChoice(req.params.id, req.body);
    return res.status(200).json(choice);
  } catch (err) {
    return next(err);
  }
}

async function remove(req, res, next) {
  try {
    const result = await choicesService.deleteChoice(req.params.id);
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
