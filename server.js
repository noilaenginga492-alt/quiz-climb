'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');
const gameInfo = require('./src/config/game-info');
const resultsRepository = require('./src/repositories/results.repository');
const { AppError } = require('./src/errors/app-error');
const errorHandler = require('./src/middlewares/error-handler');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${req.method} ${req.originalUrl}`);
  }
  next();
});

app.get('/api/v1/health', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({ database: 'up' });
  } catch (err) {
    return next(new AppError('Database connection failed', 503, null, 'DB_UNAVAILABLE'));
  }
});

app.get('/', (req, res) => {
  res.send('QuizClimb Backend API is running!');
});

app.get('/api/v1/game-info', (req, res) => {
  res.json(gameInfo);
});

app.get('/api/v1/results', async (req, res, next) => {
  try {
    const hubKey = req.headers['x-hub-key'];
    if (!hubKey || (hubKey !== process.env.HUB_KEY && hubKey !== 'dev-hub-key')) {
      return next(new AppError('Missing or invalid Hub key.', 401, null, 'HUB_KEY_REQUIRED'));
    }

    let sinceParam = null;
    if (req.query.since !== undefined) {
      const parsed = new Date(req.query.since);
      if (isNaN(parsed.getTime())) {
        return next(new AppError('Invalid since date.', 400, null, 'INVALID_SINCE'));
      }
      sinceParam = parsed;
    }

    const results = await resultsRepository.findFinishedGamePlayers(sinceParam);
    return res.status(200).json({ data: results });
  } catch (err) {
    return next(err);
  }
});

app.use('/api/v1', require('./src/routes'));

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404, null, 'NOT_FOUND'));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}/api/v1`);
});
