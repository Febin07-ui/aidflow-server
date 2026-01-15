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

exports.getMyTasksController = async (req,res) =>{
    console.log("Inside getMyTaskController")
    const {volunteerId} = req.params

    try{
        const myTasks = await tasks.find({
            volunteerId
        }).populate("requestId") // get request details// populate:It replaces requestId with full request data.

        res.status(200).json(myTasks)

    }catch(error){
        console.log(error)
        res.status(500).json("Server error")
    }
}

exports.markDeliveredController = async (req,res) =>{
    console.log("Inside markDeliveredController")

    const {taskId,requestId} = req.body

    try{
        // update task status
        await tasks.findByIdAndUpdate(taskId,{
            status:"delivered"
        })
        // update request status
        await requests.findByIdAndUpdate(requestId,{
            status:"completed"
        })

        res.status(200).json("Task marked as Delivered")

    }catch(error){
        console.log("Server error")
        res.status(500).json("Server error")
    }
}