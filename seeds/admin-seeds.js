const sequelize = require('../config/connection');
const { Admin } = require('../models');

const adminData = [
  {
    username: 'admin',
    email: 'admin@yahoo.com',
    password: 'password123',
    role: 'admin'
  }
];

const seedAdmins = () => Admin.bulkCreate(adminData, {individualHooks: true});

module.exports = seedAdmins;
