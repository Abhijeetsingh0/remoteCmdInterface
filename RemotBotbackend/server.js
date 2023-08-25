const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const dbConnection = require("./database/connection")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
dbConnection()

app.use("/command",require("./router/command"))
app.use("/servers",require("./router/servers"))

var PORT = 8001


app.listen(PORT,()=>{
    console.log(`server listening at ${PORT}`)
})


app.use((err,req,res,next)=>{
    console.log(`Somthing went wrong ${err}`)
    res.status(500);
    res.send({
        status: 500,
        message: err.message,
        body : {}
    })
})
