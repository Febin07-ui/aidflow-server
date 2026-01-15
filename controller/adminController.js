const users = require('../models/userModel')
const requests = require('../models/requestModel')
// Get aLL users
exports.getAllUsersController = async (req,res) => {
    try{
        const allUsers = await users.find({role:{$ne:"admin"}}).select("-password")
        res.status(200).json(allUsers)

    }catch(error){
        res.status(500).json("Failed to fetch users")
    }
}

// block user
exports.blockUserController = async (req,res) => {
    const {userId} =req.params

    try{
        await users.findByIdAndUpdate(userId,{isBlocked:true})
        res.status(200).json("User Blocked")
    }catch(error){
        res.status(500).json("Failed to block user")

    }
}

// unblock user
exports.unblockUserController = async (req,res) =>{
    const {userId} = req.params

    try{
        await users.findByIdAndUpdate(userId,{isBlocked:false})
        res.status(200).json('User Unblocked')
    }catch(error){
        res.status(500).json("Failed to unblock user")
    }
}
// get dashbord stats

exports.getAdminDashBoardStatsController = async (req,res) =>{
    try{
        // total user count
        const totalUsers = await users.countDocuments({
            role:{$in:["victim","volunteer"]}
        })
        // total request count
        const totalRequest = await requests.countDocuments()
        // accepted count
        const acceptedRequest = await requests.countDocuments({
            status:"assigned"
        })
        // pending count
        const pendingRequest = await requests.countDocuments({
            status:"pending"
        })

        res.status(200).json({totalUsers,totalRequest,acceptedRequest,pendingRequest})

    }catch(error){  
        console.log(error)
        res.status(500).json("Failed to load dashboard data")

    }
}