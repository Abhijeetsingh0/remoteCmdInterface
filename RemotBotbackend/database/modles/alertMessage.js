const mongoose = require("mongoose")

const alertMessageSchema = mongoose.Schema({
    serverName:{
        type: String,
        required: true,
    },
    host:{
        type : String,
        required : true,
    },
    userName:{
        type: String,
        required : true,
    },
    alertType:{
        type: String,
        required: true,  
    },
    message:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
})

const alertMessage = mongoose.model("alertMessage", alertMessageSchema)

module.exports = {alertMessage}