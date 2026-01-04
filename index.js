// loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/routing')
require('./config/db')

// create server using express
const aidflowServer = express()

// enable cors in express server
aidflowServer.use(cors())

// add json parser to server
aidflowServer.use(express.json())

// user router in server
aidflowServer.use(router)

// create a port where server should listen in web
const PORT = 3000

// server listen to the port
aidflowServer.listen(PORT,()=>{
    console.log("aidFlow server started... and waiting for client request")
})

// resolve http get request to http://localhost:3000/ using server
aidflowServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>aidFlow server started... and waiting for client request</h1>`)
})
