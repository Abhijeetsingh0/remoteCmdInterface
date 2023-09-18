var SSH = require('simple-ssh');
const {commandDetails} = require("../database/modles/commands");


module.exports.getCommand = async (req,res) =>{
    try{
        const responses = {}
        const resp = await commandDetails.find() 
        responses.data = resp
        res.send({...responses,status:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    } 
}

module.exports.postCommand = async (req, res) => {
    try {
        const { serverName , host, userName, password, command } = req.body;
        const responses = {};
        console.log('Command:', command);
        console.log(req.body)
        const ssh = new SSH({
            host: host,
            user: userName,
            pass: password
        });

        // Attach an error handler for SSH connection errors
        ssh.on('error', (err) => {
            console.error('SSH connection error:', err);
            return res.status(500).json({ error: 'SSH connection error' });
        });

        ssh.exec(command, {
            out: function(stdout) {
                const cmdOutput = stdout;
                console.log(cmdOutput);
                responses.output = cmdOutput;
            },
            exit: async function(code) {
                console.log('Command exit code:', code);
                if (code === 0) {
                    try {
                        const finalRes = await commandDetails({
                            serverName: serverName,
                            host: host,
                            userName: userName,
                            command:command,
                            password: password,
                            outPut: responses.output
                        }).save();
                        console.log('Command details saved:', finalRes);
                        return res.status(200).json(responses);
                    } catch (error) {
                        console.error('Error saving command details:', error);
                        return res.status(500).json({ error: 'Error saving command details' });
                    }
                } else {
                    return res.status(500).json({ error: 'Command execution failed' });
                }
            }
        }).start();
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
};

module.exports.getCommandsHostAndUser = async (req,res) =>{
    const responses = {}
    try{
        const { host , userName } = req.params
        responses.data = await commandDetails.find({host,userName})
        console.log(host, userName, responses.data)
        res.send({...responses,status:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}

module.exports.getCommandsHost = async (req,res) =>{
    const responses = {}
    try{
        const { host } = req.params
        responses.data = await commandDetails.find({host})
        console.log(host,responses.data)
        res.send({...responses,status:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}

module.exports.getCommandsServerName = async (req,res) =>{
    const responses = {}
    try{
        const { serverName } = req.params
        responses.data = await commandDetails.find({serverName})
        res.send({...responses,status:200})
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ error: `An error occurred : ${err}` });
    }
}