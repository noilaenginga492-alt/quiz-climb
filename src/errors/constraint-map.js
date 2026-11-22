'use strict';

module.exports = {
  unique_player_per_session: {
    status: 409,
    code: 'ALREADY_IN_GAME',
    message: 'You are still playing another game. Finish it first.'
  },
  uq_player_nickname: {
    status: 409,
    code: 'NICKNAME_TAKEN',
    message: 'That nickname is already used in this game.'
  },
  game_sessions_set_id_fkey: {
    status: 409,
    code: 'QUESTION_SET_IN_USE',
    message: 'This question set was used in a game and cannot be deleted.'
  }
};
