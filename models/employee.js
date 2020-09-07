const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class Employee extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model
Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'employee'
    },
    pto: {  //set up variable for PTO
        type: DataTypes.INTEGER,
        allowNull: false,
    }, // closes PTO
    holiday: {  //set up variable for holiday 
        type: DataTypes.INTEGER,
        allowNull: false,
    }, // closes holiday
    sick: {  //set up variable for sick
        type: DataTypes.INTEGER,
        allowNull: false,
    }, // closes sick
    }, // closes employee init
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newEmployeeData) {
        newEmployeeData.password = await bcrypt.hash(newEmployeeData.password, 10);
        return newEmployeeData;
      },

      async beforeUpdate(updatedEmployeeData) {
        updatedEmployeeData.password = await bcrypt.hash(updatedEmployeeData.password, 10);
        return updatedEmployeeData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee'
  }
);

module.exports = Employee;