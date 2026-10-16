'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Fetch 3 created users from the users table
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM "users" ORDER BY id ASC LIMIT 3;`
    );
    const primaryUserId = users[0].id;

    // 2. Insert Question Set
    await queryInterface.bulkInsert('question_sets', [{
      title: 'General Software Engineering',
      description: 'A quiz covering basic software engineering and database concepts.',
      user_id: primaryUserId,
      created_at: new Date(),
      updated_at: new Date()
    }]);

    const [questionSet] = await queryInterface.sequelize.query(
      `SELECT id FROM "question_sets" LIMIT 1;`
    );
    const questionSetId = questionSet[0].id;

    // 3. Insert Question
    await queryInterface.bulkInsert('questions', [{
      question_set_id: questionSetId,
      question_text: 'What does SQL stand for?',
      created_at: new Date(),
      updated_at: new Date()
    }]);

    // 4. Insert Game Session
    await queryInterface.bulkInsert('game_sessions', [{
      question_set_id: questionSetId,
      user_id: primaryUserId,
      session_code: 'TEST1234',
      status: 'CLOSED',
      created_at: new Date(),
      updated_at: new Date()
    }]);

    const [gameSession] = await queryInterface.sequelize.query(
      `SELECT id FROM "game_sessions" WHERE status = 'CLOSED' LIMIT 1;`
    );
    const gameSessionId = gameSession[0].id;

    // 5. Insert Players with distinct user IDs (satisfying unique session/user constraint)
    await queryInterface.bulkInsert('players', [
      {
        game_session_id: gameSessionId,
        user_id: users[0].id,
        score: 100,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        game_session_id: gameSessionId,
        user_id: users[1].id,
        score: 80,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        // Awkward / incomplete case: Player who scored 0
        game_session_id: gameSessionId,
        user_id: users[2].id,
        score: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('players', null, {});
    await queryInterface.bulkDelete('game_sessions', null, {});
    await queryInterface.bulkDelete('questions', null, {});
    await queryInterface.bulkDelete('question_sets', null, {});
  }
};