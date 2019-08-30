const db = require('../database')('users');

exports.list = () => {
  return db
          .select('id', 'username', 'department');
};

exports.listByUsersDepartment = department => {
  return db
          .select('id', 'username', 'department')
          .where({ department });
};

exports.listByUserId = id => {
  return db
          .where({ id });
};

exports.listByUsername = username => {
  return db
          .where({ username });
};

exports.new = user => {
  return db
          .insert(user)
          .then(([ id ]) => this.listByUserId(id));
};

exports.rm = id => {
  return db
          .where({ id })
          .del();
};

exports.update = (id, user) => {
  return db
          .where({ id })
          .update(user)
          .then(() => this.listByUserId(id));
};