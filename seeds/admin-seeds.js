const sequelize = require('../config/connection');
const { Admin } = require('../models');

const admindata = [
  {
    username: 'admin',
    email: 'admin@yahoo.com',
    password: 'password123',
    role: 'admin'
  }
];

const seedAdmins = () => Admin.bulkCreate(admindata, {individualHooks: true});

module.exports = seedAdmins;
