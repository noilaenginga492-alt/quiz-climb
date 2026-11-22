'use strict';

const { matchedData } = require('express-validator');
const gameSessionsService = require('../services/game-sessions.service');

function toJson(session) {
  const raw = session && session.toJSON ? session.toJSON() : session;
  return {
    id: raw.id,
    session_code: raw.session_code,
    status: raw.status,
    question_set_id: raw.question_set_id,
    user_id: raw.user_id,
    created_at: raw.created_at,
    updated_at: raw.updated_at
  };
}

async function index(req, res, next) {
  try {
    const items = await gameSessionsService.getAllSessions();
    return res.status(200).json({ data: items.map(toJson) });
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  try {
    const { code } = matchedData(req, { locations: ['params'] });
    const session = await gameSessionsService.getSessionByCode(code);
    return res.status(200).json({ data: toJson(session) });
  } catch (err) {
    return next(err);
  }
}

async function store(req, res, next) {
  try {
    const data = matchedData(req, { locations: ['body'] });
    const created = await gameSessionsService.createSession(data, req.user);
    return res.status(201).json({ data: toJson(created) });
  } catch (err) {
    return next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const { code } = matchedData(req, { locations: ['params'] });
    const data = matchedData(req, { locations: ['body'] });
    const updated = await gameSessionsService.updateSessionByCode(code, data, req.user);
    return res.status(200).json({ data: toJson(updated) });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  index,
  show,
  store,
  updateStatus
};
