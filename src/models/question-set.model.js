'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const QuestionSet = sequelize.define(
    'QuestionSet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING, 
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
      },
    },
    {
      tableName: 'question_sets',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return QuestionSet;
};