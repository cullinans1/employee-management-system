//import all models
const Employee = require('./Employee');
const Admin = require('./Admin');

//create associations
Admin.hasMany(Employee, {
    foreignKey: 'adminId'
});

model.exports = { Employee, Admin };