'use strict';

const { User } = require('../models');

async function currentUser(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    return next();
  }

  req.user = null;
  const demoHeader = req.get('X-Demo-User');
  if (!demoHeader) {
    return next();
  }

  try {
    const trimmed = String(demoHeader).trim();
    if (!trimmed) {
      return next();
    }

    let user = null;
    if (/^\d+$/.test(trimmed)) {
      user = await User.findByPk(Number(trimmed));
    }
    if (!user) {
      user = await User.findOne({ where: { user_id: trimmed } });
    }
    if (!user) {
      user = await User.findOne({ where: { school_id: trimmed } });
    }

    if (user) {
      const raw = user.toJSON ? user.toJSON() : user;
      req.user = {
        id: raw.id !== undefined ? raw.id : raw.user_id,
        user_id: raw.user_id !== undefined ? raw.user_id : raw.id,
        school_id: raw.school_id || null,
        role: raw.role || null
      };
    }

    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = currentUser;
