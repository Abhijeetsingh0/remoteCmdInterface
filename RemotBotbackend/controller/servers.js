const { serversDetails } = require("../database/modles/servers")
const { alertDetails } = require("../database/modles/alerts")

module.exports.getServers = async (req, res) => {
    try{
        const allServerDetails = await serversDetails.find()
        console.log(allServerDetails)
        return res.status(200).json(allServerDetails);
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}

module.exports.getServersByHostName = async (req,res)=>{
    try{
        const { host } = req.params
        const serverByHost = await serversDetails.find({host})
        console.log(serverByHost)
        return res.status(200).send(serverByHost)
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}


module.exports.getServersByServerName = async (req,res)=>{
    try{
        const { serverName } = req.params
        const serverByHost = await serversDetails.find({serverName})
        console.log(serverByHost)
        return res.status(200).send(serverByHost)
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}


module.exports.getServersByUserName = async (req,res)=>{
    try{
        const { userName } = req.params
        console.log(req.params)
        const serverByUserName = await serversDetails.find({userName})
        console.log(serverByUserName)
        return res.status(200).send(serverByUserName)
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` }); 
    }
}

module.exports.deleteServer = async (req,res) => {
    try{
        const { _id, serverName }  = req.params
        console.log("here is the server name",serverName)
        const deletServer = await serversDetails.findByIdAndDelete({_id})
        const removeAllTheAlertsOnThisServer = await alertDetails.deleteMany({serverName})
        return res.status(200).send(deletServer,removeAllTheAlertsOnThisServer)
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}


module.exports.postServers = async (req, res) => {
    const response = {}
    try{
        console.log(req.body)
        response.newServerDetail = await serversDetails({...req.body}).save()
        response.status = 200
        return res.status(response.status).send(response)
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}
