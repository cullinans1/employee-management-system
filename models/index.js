//import all models
const Employee = require('./Employee');
const Admin = require('./Admin');

//create associations
Admin.hasMany(Employee, {

});

Employee.belongsTo(Admin, {
    
});


model.exports = { Employee, Admin };