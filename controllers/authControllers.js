const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/database')

const authCtrl ={
    register:async(req, res) => {

       try {
           
            const {email, username, password} = req.body;
            if(!email || !username || !password)
            return res.send({message:"Please provide all the fields"})

            if(email.length<5 || email.length>30)
            return res.send({success:false,message:"E mail must be at least 5 characters"})

            if(password.length<5)
            return res.send({success:false,message:"password must be at least 5 characters"})

            if(username.length<2)
            return res.send({success:false,message:"username must be at least 2 characters"})

            isRegistered = await User.find({email})
            if(isRegistered.length>0)
            return res.send({success:false,message:"email already exist "})
            

            const hashedPasssword = await bcrypt.hashSync(password,12)

            let user = new User({
                username:username.toLowerCase(),
                password: hashedPasssword,
                email
            })

           await user.save()

           return res.status(200).send({message:"registration sucess", success:true})

       } catch (error) {
          
            res.status(500).send({message:error.message})
       }

        

    }
    ,isUsernameAvailable:async(req, res)=> {
        try {
            
            const user = await User.findOne({username:req.params.username})
            if(user)
            return res.send({message:"username already taken", success:false})

            return res.send({message:"username is available", success:true})
        } catch (error) {
            
            res.status(500).send({message: error.message})
        }
    }
    ,isEmailAvailable:async(req, res)=> {
        try {
           
            const user = await User.findOne({email:req.params.email})
            if(user)
            return res.send({message:"email already registered", success:false})

            return res.send({message:"email is available", success:true})
        } catch (error) {
            
            res.status(500).send({message: error.message})
        }
    }
    ,userLogin: async(req, res) =>{
        const {username, password} = req.body
        if(!username || !password)
        return res.send({success:false, message:"please provide a valid username and password"})

        try{
            const user = await User.findOne({username: username.toLowerCase()})
            if(!user) return res.send({success:false, message:"user not found"})

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) return res.send({success:false, message:"username or password is not valid"})
            
            const jwtToken = jwt.sign({userId:user._id},config.JwtSecret, {expiresIn: '24h'})

            res.status(200).send({success:true, token:jwtToken,user:{username:user.username} ,message:"Loged in"})

        }catch(error) {
            res.status(500).send({message:error.message})
        }
    }
}

module.exports = authCtrl;
