const router = require('express').Router();
const customerController = require("../controllers/customer.controller")
const jwt = require('../middleware/jwt')

router.get('/getcustomer',jwt.verifyToken ,customerController.getCustomerAll)
router.get('/getcustomer/:id',jwt.verifyToken ,customerController.getCustomerById)
router.post('/getcustomerbyname',jwt.verifyToken ,customerController.getCustomerByName)
router.get('/getcustomerbyusername',jwt.verifyToken, customerController.getCustomerByUsername)
router.post('/register',customerController.addCustomer)
router.post('/login',customerController.loginCustomer)
router.put('/addcoin/:id',jwt.verifyToken ,customerController.addCoinCustomer)
router.put('/update',jwt.verifyToken, customerController.updateCustomer)

module.exports = router 