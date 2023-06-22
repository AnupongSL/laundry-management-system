const router = require('express').Router();
const jwt = require('../middleware/jwt')

router.use('/admin',require('./admin.route'))
router.use('/customer',require('./customer.route'))
router.use('/washing_machines',jwt.verifyToken, require('./washing_machines.route'))
router.use('/history',jwt.verifyToken, require('./history.route'))

module.exports = router 