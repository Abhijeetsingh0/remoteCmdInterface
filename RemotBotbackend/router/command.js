const express = require("express")
const router = express.Router()

const commandController = require('../controller/command');

// Add routes
router.get('/', commandController.getCommand);
router.post('/', commandController.postCommand);
router.get('/:host/:userName',commandController.getCommandsHostAndUser)
router.get('/:host',commandController.getCommandsHost)
router.get('/:serverName',commandController.getCommandsServerName)

module.exports = router;
