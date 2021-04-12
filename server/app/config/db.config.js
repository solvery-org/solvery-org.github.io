module.exports = {
    user: 'xjfqwgak',
    host: 'kandula.db.elephantsql.com',
    database: 'Solvery_Server',
    password: 'H1k4qyq37OCEXXUo31Ok0hh6EgziQHTq',
    dialect: 'postgres',
    port: 3211,
    pool: {
      max: 5,             //max # of connections in a pool
      min: 0,             //min # of connections in a pool
      acquire: 30000,     //acquire max time in ms the pool will try before throwing a connection
      idle: 10000        //max time in ms that a connection can be idleqr
    }
  }
