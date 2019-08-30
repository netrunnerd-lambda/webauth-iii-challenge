exports.up = knex => {
  return knex
          .schema
          .createTable('users', tb => {
            tb
              .increments();
            
            tb
              .string('username')
              .notNullable()
              .unique();

            tb
              .string('password')
              .notNullable();

            tb
              .string('department')
              .notNullable()
              .defaultTo('unassigned');
          });
};

exports.down = knex => {
  return knex
          .schema
          .dropTableIfExists('users');
};