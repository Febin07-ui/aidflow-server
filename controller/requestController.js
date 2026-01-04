const requests = require('../models/requestModel')

// create requestcontroller
exports.createRequestController = async (req,res) =>{
    console.log("inside createRequestController");
    const {resourceType,urgency,location,details,contactName,phone} = req.body
    try{
        const newRequest = new requests({
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