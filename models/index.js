//import all models
const Employee = require('./Employee');
const Admin = require('./Admin');

//create associations
Admin.hasMany(Employee, {
    foreignKey: 'adminId'
});

module.exports = { Employee, Admin };