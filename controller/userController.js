const users = require('../models/userModel')
// jsonwebtoken
const jwt = require('jsonwebtoken')

//register api request
exports.registerController = async (req,res) =>{
    console.log("Inside registerController")
    const {username,email,password,role} = req.body
    console.log(username,email,password)
    try{
        // check mail in Model
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User Already exists!! Please Login...")
        }else{
            const newUser = new users({
                // updation
                username,email,password,role,isBlocked:false
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    // res.status(200).json("Request Received")

}
//login api
exports.loginController = async (req,res) =>{
    console.log("Inside registerController")
    const {email,password} = req.body
    console.log(email,password)
    try{
        // check mail in Model
        const existingUser = await users.findOne({email})
        if(existingUser){
            if(password == existingUser.password){
                // generate token
                const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET,{ expiresIn: "1d" })
                res.status(200).json({token,
                user: {
                    _id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    role: existingUser.role
            }})
            }else{
                res.status(401).json("Incorrect Email/Password")
            }
        }else{
            res.status(404).json("Account Does not Exist!!!")
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    // res.status(200).json("Request Received")

}
// victim editprofile
// volunteer edit profile
// admin editprofile


