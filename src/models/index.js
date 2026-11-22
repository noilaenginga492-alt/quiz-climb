'use strict';

const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

const User = require('./user.model')(sequelize);
const QuestionSet = require('./question-set.model')(sequelize);
const Question = require('./question.model')(sequelize);
const Choice = require('./choice.model')(sequelize);
const GameSession = require('./game-session.model')(sequelize);
const Player = require('./player.model')(sequelize);

User.hasMany(GameSession, { foreignKey: 'user_id', as: 'hostedSessions' });
GameSession.belongsTo(User, { foreignKey: 'user_id', as: 'host' });

User.hasMany(Player, { foreignKey: 'user_id', as: 'players' });
Player.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

QuestionSet.hasMany(Question, { foreignKey: 'question_set_id', as: 'questions' });
Question.belongsTo(QuestionSet, { foreignKey: 'question_set_id', as: 'questionSet' });

Question.hasMany(Choice, { foreignKey: 'question_id', as: 'choices' });
Choice.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

GameSession.hasMany(Player, { foreignKey: 'game_session_id', as: 'players' });
Player.belongsTo(GameSession, { foreignKey: 'game_session_id', as: 'session' });

module.exports = {
  sequelize,
  User,
  QuestionSet,
  Question,
  Choice,
  GameSession,
  Player,
};
