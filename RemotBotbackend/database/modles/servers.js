const mongoose = require("mongoose")

const serverSchema = mongoose.Schema({
    serverName:{
        type: String,
        required: true,
    },
    host:{
        type: String,
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
})

const serversDetails = mongoose.model("serverDetails",serverSchema)

module.exports = {serversDetails}
