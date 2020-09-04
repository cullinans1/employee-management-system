const seedAdmins = require('./admin-seeds');
const seedEmployees = require('./employee-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedAdmins();
  console.log('--------------');

  await seedEmployees();
  console.log('--------------');

  process.exit(0);
};

seedAll();