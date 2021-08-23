const User = require('../models/User')

const userCtrl ={

    getProfile: async(req, res)=>{
        try {
            const user = await User.findOne({_id:req.user._id}).select("-password")
            if(user) return res.status(200).send({user, success:true})
        } catch (error) {
            res.status(500).send({message:error.message, success:false})
        }
    }
}

module.exports = userCtrl