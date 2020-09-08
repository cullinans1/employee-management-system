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

//Find a specific employee
router.get("/:id", (req, res) => {
    Employee.findOne({
        where: {
          id: req.body.id,
         },
        })
.then(dbUserData => res.json(dbUserData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;