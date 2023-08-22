import { Db } from 'mongodb';

module.exports = {
  async up(db: Db) {
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
  },
};
