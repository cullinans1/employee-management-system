const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use('/', homeRoutes); //added for homepage
router.use('/dashboard', dashboardRoutes); //added for dashboard
router.use('/api', apiRoutes);


module.exports = router;