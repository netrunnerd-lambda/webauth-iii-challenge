const db = require('../database');
const tb = 'users';

exports.list = () => {
  return db(tb)
          .select('id', 'username', 'department');
};

exports.listByUsersDepartment = department => {
  return db(tb)
          .select('id', 'username', 'department')
          .where({ department });
};

exports.listByUserId = id => {
  return db(tb)
          .where({ id })
          .first();
};

exports.listByUsername = username => {
  return db(tb)
          .where({ username })
          .first();
};

exports.new = user => {
  return db(tb)
          .insert(user)
          .then(([ id ]) => this.listByUserId(id));
};

exports.rm = id => {
  return db(tb)
          .where({ id })
          .del();
};

exports.update = (id, user) => {
  return db(tb)
          .where({ id })
          .update(user)
          .then(() => this.listByUserId(id));
};