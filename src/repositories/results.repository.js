'use strict';

const { Sequelize, QueryTypes } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

async function findFinishedGamePlayers(since) {
  const sql = `
    SELECT 
      s.session_code, 
      s.created_at AS started_at, 
      s.updated_at AS ended_at,
      NULL AS school_id, 
      u.username AS nickname, 
      p.score,
      true AS completed
    FROM game_sessions s
    JOIN players p ON p.game_session_id = s.id
    JOIN users u ON u.id = p.user_id
    WHERE s.status = 'CLOSED'
      AND (CAST(:since AS timestamptz) IS NULL OR s.updated_at > CAST(:since AS timestamptz))
    ORDER BY s.updated_at DESC, p.score DESC
  `;

  return sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: { since: since ? since.toISOString() : null },
  });
}

module.exports = {
  findFinishedGamePlayers,
};
