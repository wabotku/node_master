const knex = require("knex");

module.exports = (env) => {
  const environment = env || "development";
  const config = {
    development: {
      client: "postgresql",
      connection: {
        database: "finsa",
        user: "postgres",
        password: "root",
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: "knex_migrations",
      },
    },

    staging: {
      client: "postgresql",
      connection: {
        database: "my_db",
        user: "username",
        password: "password",
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: "knex_migrations",
      },
    },

    production: {
      client: "postgresql",
      connection: {
        database: "my_db",
        user: "username",
        password: "password",
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        tableName: "knex_migrations",
      },
    },
  };
  
  return knex(config[environment]);
};
