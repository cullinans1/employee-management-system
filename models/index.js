//import all models
const Employee = require('./employee');
const Admin = require('./admin');

//create associations
Admin.hasMany(Employee, {
    foreignKey: 'adminId'
});

module.exports = { Employee, Admin };