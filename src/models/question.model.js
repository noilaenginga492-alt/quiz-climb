'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Question = sequelize.define(
    'Question',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      question_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      question_set_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'questions',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Question;
};
