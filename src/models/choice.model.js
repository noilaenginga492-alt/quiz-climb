'use strict';

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Choice = sequelize.define(
    'Choice',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      choice_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'choices',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Choice;
};
