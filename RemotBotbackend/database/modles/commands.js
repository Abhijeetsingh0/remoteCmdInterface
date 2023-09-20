const mongoose = require("mongoose")

const commandSechma = mongoose.Schema({
    serverName:{
        type: String,
        required: true,
    }
    ,
    host:{
        type : String,
        required : true,
    },
    userName:{
        type: String,
        required : true,
    },
    command:{
        type: String,
        required: true,
    },
    outPut:{
        type: String,
        required: true,  
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
})

const commandDetails = mongoose.model("commandDetails",commandSechma)

module.exports = {commandDetails}