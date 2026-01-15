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
    console.log("Inside loginController")
    const {email,password} = req.body
    console.log(email,password)
    try{
        // check mail in Model
        const existingUser = await users.findOne({email})
        if(existingUser){
            if(existingUser.isBlocked){
                return res.status(403).json("Your account is Blocked by admin")
            }else if(password == existingUser.password){
                // generate token
                const token = jwt.sign({userMail: existingUser.email ,role:existingUser.role},process.env.JWTSECRET,{ expiresIn: "1d" })
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
// google login
exports.googleLoginController = async (req,res) =>{
    console.log("Inside GoogleLoginController")
    const {email,password,username,picture} = req.body
    console.log(email,password,username,picture)
    try{
        // check mail in Model
        const existingUser = await users.findOne({email})
        if(existingUser){
            //login
            // generate token
            const token = jwt.sign({userMail: existingUser.email ,role:existingUser.role},process.env.JWTSECRET,{ expiresIn: "1d" })
            res.status(200).json({token,
            user: {
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role,
                picture:existingUser.picture
            }})

        }else{
            // register
            const newUser= await users.create({
                username,email,password,picture
            })
            const token = jwt.sign({userMail: newUser.email ,role:newUser.role},process.env.JWTSECRET,{ expiresIn: "1d" })
            res.status(200).json({token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                picture:newUser.picture
            }})
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


