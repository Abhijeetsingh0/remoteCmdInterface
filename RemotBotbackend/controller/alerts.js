const {alertDetails} = require("../database/modles/alerts")
const {alertMessage} = require("../database/modles/alertMessage")

module.exports.getAllAlerts = async (req, res) => {
    const responses = {}
    try{
        responses.data = await alertDetails.find();
        res.send({...responses,status:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}

module.exports.postAlert = async (req, res) =>{
    try{ 
        const data = await alertDetails({...req.body}).save();
        res.send({...data,status:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}

module.exports.getAlertAsPerServerName = async (req, res) =>{
    const responses = {}
    try{
        const {serverName} = req.params;
        responses.data = await alertDetails.find({serverName})
        return res.status(200).send(responses)
    }catch(err){
        console.error('Error',err);
        res.status(500).json({error:`An error occurred :' ${err}`});
    }
}

module.exports.deleteAlertOnId = async (req, res)  => {
    const responses = {}
    try{
        const { _id } = req.params
        responses.message = await alertDetails.findOneAndDelete(_id)
        res.send({...responses, state:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}

module.exports.getAlertMessage = async (req, res) => {
    const responses = {}
    try{
        responses.data = await alertMessage.find();
        res.send({...responses,status:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}

module.exports.postAlertMessage = async (req, res) => {
    const responses = {}
    try{
        responses.data = await alertMessage({...req.body}).save();
        res.send({...responses,status:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}

module.exports.deleteAlertMessage = async (req, res) => {
    const responses = {}
    try{
        const { _id } = req.params
        responses.message = await alertMessage.findOneAndDelete(_id)
        res.send({...responses, state:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}