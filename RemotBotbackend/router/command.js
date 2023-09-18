const express = require("express")
const router = express.Router()

const commandController = require('../controller/command');

// Add routes
router.get('/', commandController.getCommand);
router.post('/', commandController.postCommand);
router.get('/server/:serverName',commandController.getCommandsServerName)
router.get('/:host',commandController.getCommandsHost)
router.get('/:host/:userName',commandController.getCommandsHostAndUser)





module.exports = router;
