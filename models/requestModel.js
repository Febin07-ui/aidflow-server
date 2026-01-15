const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    
    resourceType:String,
    urgency:String,
    location:String,
    details:String,
    contactName:String,
    phone:String,
    status:{
        type:String,
        default:"pending"
    }
},{timestamps:true})

const requests = mongoose.model("requests",requestSchema)

module.exports = requests