'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: '2099_alex_test',
        password: 'securepassword123', // or a hashed/dummy string
        role: 'player',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: '2099_sam_test',
        password: 'securepassword123',
        role: 'player',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: '2099_jordan_test',
        password: 'securepassword123',
        role: 'player',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
