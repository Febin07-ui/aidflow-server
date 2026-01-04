const tasks = require('../models/taskModel')
const requests = require('../models/requestModel');

exports.acceptTaskController = async (req,res) =>{
    console.log("Inside acceptController");

    const {requestId,volunteerId} = req.body

    try{
        // update request
        await requests.findByIdAndUpdate(
            requestId,
            {
                status:"assigned",
                assignedVolunteerId : volunteerId
            }
        )
        // create task
        const newTask = new tasks({
            requestId,
            volunteerId
        })
        await newTask.save()
        res.status(200).json("Task accepted successfully")
    }catch(error){
        console.log(error)
        res.status(500).json("Server error")
    }
}