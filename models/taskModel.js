const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    requestId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"requests",
        required:true
    },
    volunteerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    status:{
        type:String,
        default:"in-progress"
    }

},{timestamps:true})

module.exports = mongoose.model("tasks",taskSchema)