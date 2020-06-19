const Sequelize = require("sequelize");
const { config } = require("./config");

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

console.log('starting to initiate sequelize connection ......');

sequelize.authenticate().then(() => {
  console.log('database connected ......');
}).catch((err) => {
  console.error('database connection error: ', err);
});

module.exports = sequelize;