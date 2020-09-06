const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Admin, Employee } = require('../../models');

router.get('/', (req, res) => {
    Employee.findAll({
        attributes: [
            'id',
            'username',
            'email',
            'role',
            'pto',
            'holiday',
            'sick'
        ]
    });
});