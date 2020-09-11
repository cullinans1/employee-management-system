const sequelize = require('../config/connection');
const { Employee } = require('../models');

const employeeData = [
  {
    username: 'johndoe',
    email: 'johndoe@yahoo.com',
    password: 'password123',
    role: 'employee',
    pto: '40',
    holiday: '96',
    sick: '40'
  },
  {
    username: 'marysmith',
    email: 'marysmith@yahoo.com',
    password: 'password123',
    role: 'employee',
    pto: '80',
    holiday: '72',
    sick: '0'
  }
];

const seedEmployees = () => Employee.bulkCreate(employeeData, {individualHooks: true});

module.exports = seedEmployees;