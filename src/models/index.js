'use strict';

const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

const QuestionSet = require('./question-set.model')(sequelize);
const GameSession = require('./game-session.model')(sequelize);
const Player = require('./player.model')(sequelize);

GameSession.hasMany(Player, { foreignKey: 'game_session_id', as: 'players' });
Player.belongsTo(GameSession, { foreignKey: 'game_session_id', as: 'session' });

module.exports = {
  sequelize,
  QuestionSet,
  GameSession,
  Player,
};
