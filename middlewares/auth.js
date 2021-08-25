const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/database')
const auth = async(req, res, next) => {
   try {
    //    const token = req.header('Authorization')
       const token = req.headers['authorization']

       if(!token) return res.status(400).json({message: "please provide  a token"})
        const jwtToken = token.substr(7)
        
       const decoded = jwt.verify(jwtToken, config.JwtSecret )
       if(!decoded) return res.status(400).json({message:"Invalid token"})

       const user = await User.findOne({_id: decoded.userId}).select("-password")

       req.user = user
       next()

   } catch (error) {
    return res.status(500).json({message: error.message})
   }
}
module.exports = auth