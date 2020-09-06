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
            // 'pto',
            // 'holiday',
            // 'sick'
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;