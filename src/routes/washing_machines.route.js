const router = require('express').Router();
const washingController = require("../controllers/washing_machines.controller")

router.get('/getwashingmachine', washingController.getWashingMachineAll)
router.get('/getwashingmachine/:id', washingController.getWashingMachineNumber)
router.post('/register',washingController.addWashingMachine)

module.exports = router