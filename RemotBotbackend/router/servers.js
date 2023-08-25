const express = require("express")
const router = express.Router()
const server = require("../controller/servers")



router.get("/",server.getServers)
router.get("/:serverName",server.getServersByServerName)
router.get("/host/:host",server.getServersByHostName)
router.get("/user/:userName",server.getServersByUserName)
router.post("/",server.postServers)
router.delete("/:_id",server.deletServer)


module.exports = router

