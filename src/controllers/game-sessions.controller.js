'use strict';

const gameSessionsService = require('../services/game-sessions.service');

async function index(req, res, next) {
  try {
    const sessions = await gameSessionsService.getAllSessions();
    return res.status(200).json(sessions);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  try {
    const session = await gameSessionsService.getSessionById(req.params.id);
    return res.status(200).json(session);
  } catch (err) {
    return next(err);
  }
}

async function store(req, res, next) {
  try {
    const session = await gameSessionsService.createSession(req.body);
    return res.status(201).json(session);
  } catch (err) {
    return next(err);
  }
}

async function update(req, res, next) {
  try {
    const session = await gameSessionsService.updateSessionById(req.params.id, req.body);
    return res.status(200).json(session);
  } catch (err) {
    return next(err);
  }
}

async function destroy(req, res, next) {
  try {
    const result = await gameSessionsService.deleteSessionById(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
