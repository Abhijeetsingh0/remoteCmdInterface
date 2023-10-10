const express = require("express")
const router = express.Router()
const alertsController =  require("../controller/alerts")

router.get("/",alertsController.getAllAlerts)
router.post("/",alertsController.postAlert)
router.get('/server/:serverName',alertsController.getAlertAsPerServerName)
router.delete("/:_id",alertsController.deleteAlertOnId)
router.get("/message",alertsController.getAlertMessage)
router.post("/message",alertsController.postAlertMessage)
router.delete("/message/:_id",alertsController.deleteAlertMessage)

module.exports = router;