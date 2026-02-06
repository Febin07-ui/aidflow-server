const { request } = require('express');
const requests = require('../models/requestModel')
const jwt = require("jsonwebtoken")
// create requestcontroller
exports.createRequestController = async (req,res) =>{
    console.log("inside createRequestController");
    const {resourceType,urgency,location,details,contactName,phone} = req.body

    try{

        const authHeader = req.headers.authorization
        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWTSECRET)

        const victimId = decoded.userId  

        const newRequest = new requests({
        victimId,   
        resourceType,
        urgency,
        location,
        details,
        contactName,
        phone,
        status:"pending"
        })

        await newRequest.save()

        res.status(200).json("Request submitted successfully")

    }catch(error){
        console.log(error)
        res.status(500).json("Server error")
    }
}
//get all victim request (victim)
exports.getVictimRequestController = async(req,res) =>{
    console.log("Inside getVictimRequestsController")

    
    try{
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json("Authorization header missing")
        }
        // get token from header 
        const token = authHeader.split(" ")[1]
        // verify token
        const decoded = jwt.verify(token,process.env.JWTSECRET)
        // get victim id from token
        const victimId = decoded.userId
        // fetch only this victim's requests
        const myRequests = await requests.find({victimId})

        res.status(200).json(myRequests)
    }catch(error){
        console.log(error)
        res.status(401).json("Unauthorized access")
    }
}
// get all requests (admin)
exports.getAllRequestsController = async (req,res) => {
    console.log("Inside getAllRequestController")

    try{
        const allRequests = await requests.find().sort({createdAt: -1})
        res.status(200).json(allRequests)

    }catch(error){
        console.log(error)
        res.status(500).json("Server error")
    }
}

// approve or reject request (admin)
exports.updateRequestStatusController = async (req,res) =>{
    console.log("Inside updateRequestStatusController")

    const {id} = req.params
    const {status} = req.body

    try{
        const updatedRequest = await requests.findByIdAndUpdate(
            id,
            {status},
            {new:true}
        )
        res.status(200).json(updatedRequest)
    }catch(error){
        console.log(error)
        res.status(500).json("Server Error")
    }

}

// get approved requests
exports.getApprovedRequestController = async (req,res) =>{
    console.log("Inside getApprovedRequestController")

    try{
        const approvedRequest = await requests.find({
            status:"approved"
        }).sort({createdAt : -1})

        res.status(200).json(approvedRequest)
    }catch(error){
        console.log(error)
        res.status(500).json("Server error")

    }
    
}