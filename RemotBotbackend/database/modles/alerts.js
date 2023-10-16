const mongoose = require("mongoose")

const alertSchema = mongoose.Schema({
    serverName:{
        type: String,
        required: true,
    }
    ,
    host:{
        type : String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    alertType:{
        type: String,
        required: true,  
    },
    alertDetails:{
        type: Array,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
})

const alertDetails = mongoose.model("alertDetails", alertSchema)

module.exports = {alertDetails}
