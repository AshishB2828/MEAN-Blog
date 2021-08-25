const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {type:String , required:true},
    body: {type:String , required:true},
    images: { type: Array},
    createdBy:{type:String},
    uid:mongoose.Types.ObjectId,
    createdAt:{type:Date, default:Date.now()},
    likedBy: Array,
    DislikedBy: Array,
    likes:{type:Number, default:0},
    Dislikes:{type:Number, default:0},
    comments: { comment:{type: String}, commentator:{type:String} },
}, {
    timestamps: true
})

module.exports = mongoose.model('blog', blogSchema)