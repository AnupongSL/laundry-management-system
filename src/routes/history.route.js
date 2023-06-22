const router = require('express').Router();
const historyController = require("../controllers/history.controller")

router.get('/gethistoryall',historyController.getHistoryAll)
router.post('/gethistorydate',historyController.getHistoryDate)
router.post('/gethistorybyname',historyController.getHistoryByName)
router.get('/gethistorybyusername',historyController.getHistoryByUsername)
router.post('/gethistoryusernamebydate', historyController.getHistoryUsernameByDate)

module.exports = router