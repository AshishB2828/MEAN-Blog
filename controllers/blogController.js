const mongoose  = require('mongoose');
const Blog = require('../models/Blog')

const blogCtrl ={

    getAllBlogs: async(req, res)=>{
        try {
            const blogs = await Blog.find({}).sort("-createdAt")
            res.send({blogs, success:true})
        } catch (error) {
            return res.status(500).send({success:false, message:error.message})
        }
    },
    createNewBlog: async(req, res)=>{

        const {title, body, images} = req.body
        if(!title) return res.send({success: false, message:"Please provide a title"})
        if(!body) return res.send({success: false, message:"Please provide a body"})

        const newBlog = new Blog({
            title,
            body,
            images,
            uid:req.user._id,
            createdBy:req.user.username,  
        })

        try {

            await newBlog.save()
            return res.status(201).send({success:true, message:"post created", blog:newBlog})
        } catch (error) {
            return res.status(500).send({success: false, message:error.message})
        }
    },
    getBlogById:async(req, res)=>{
        try {
            const blog = await Blog.findOne({_id:req.params.id}) 
            if(!blog) 
            return res.status(203).send({success: false, message:"blog not found"})

            if(req.user.username !== blog.createdBy)
            return res.status(403).send({success:false, message:"your not allowed to do this operation"})

            res.status(200).send({success: true, blog})

        } catch (error) {
            console.log(error.message)
            res.status(500).send({success: false, message:error.message})
        }
    },
    updateBlogById: async(req, res)=>{
        if(!req.body._id)
        return res.status(400).send({success: false, message:"id not provided"})
        
        try {
            const isBlogExist = await Blog.findOne({_id:req.body._id})
            if(!isBlogExist)
            return res.status(203).send({success: false, message:"blog not found"})

            if(req.user.username !== req.body.createdBy)
            return res.status(403).send({success: false, message:"your not allowed to do this operation"})

            await Blog.findByIdAndUpdate(req.body._id, req.body)
            return res.status(200).send({success: true, message:"blog updated"})
            
        } catch (error) {
        return res.status(500).send({success: false, message:error.message})   
        }
    },
    deleteBlogById: async(req, res)=>{
        if(!req.params.id)
        return res.status(400).send({success: false, message:"id not provided"})
        
        try {
            const isBlogExist = await Blog.findOne({_id:req.params.id})
            if(!isBlogExist)
            return res.status(203).send({success: false, message:"blog not found"})

            if(req.user.username !== isBlogExist.createdBy)
            return res.status(403).send({success: false, message:"your not allowed to do this operation"})

            await Blog.findByIdAndDelete(req.params.id)
            return res.status(200).send({success: true, message:"blog deleted"})
            
        } catch (error) {
        return res.status(500).send({success: false, message:error.message})   
        }
    },
    likeBlog:async(req, res)=>{
        if(!req.params.id)
        return res.status(400).send({success: false, message:"please provide a Id"})
        const {id} = req.params
        try {
            const isBlogLiked = await Blog.findOne({_id: id, likedBy:req.user._id })
            if(isBlogLiked) 
            return res.status(400).send({success: false, message:"You already liked this blog"})

            const isBlogDisLiked = await Blog.findOne({_id: id, DislikedBy:req.user._id })
            if(isBlogDisLiked) 
            {
                const blog = await Blog.findOneAndUpdate({_id: id},
                    {$pull:{DislikedBy:req.user._id}}
                    ,{new:true}
                    )
                    if(!blog)
                    return res.status(400).send({success: false, message:"blog doesnt exist"})
            }
        
            const blog = await Blog.findOneAndUpdate({_id: id},
                {$push:{likedBy:req.user._id}}
                ,{new:true}
                ) 

            if(!blog) return res.status(400).send({success: false, message:"blog doesnt exist"})
                return res.status(200).send({success: true, message:"liked", blog})


        } catch (error) {
            return res.status(500).send({success: false, message:error.message})
        }
    },
    disLikeBlog:async(req, res)=>{
        if(!req.params.id)
        return res.status(400).send({success: false, message:"please provide a Id"})
        const {id} = req.params
        try {
            const isBlogDisLiked = await Blog.findOne({_id: id, DislikedBy:req.user._id })
            if(isBlogDisLiked) 
            return res.status(400).send({success: false, message:"You already disliked this blog"})

            const isBlogLiked = await Blog.findOne({_id: id, likedBy:req.user._id })
            if(isBlogLiked) 
            {
                const blog = await Blog.findOneAndUpdate({_id: id},
                    {$pull:{likedBy:req.user._id}}
                    ,{new:true}
                    )
                    if(!blog)
                    return res.status(400).send({success: false, message:"blog doesnt exist"})
            }
        
            const blog = await Blog.findOneAndUpdate({_id: id},
                {$push:{DislikedBy:req.user._id}}
                ,{new:true}
                ) 
            if(!blog) return res.status(400).send({success: false, message:"blog doesnt exist"})
                return res.status(200).send({success: true, message:"liked", blog})


        } catch (error) {
            return res.status(500).send({success: false, message:error.message})
        }
    },
    createComment:async(req, res)=>{
        if(!req.body._id)
        return res.status(400).send({success: false, message:"no comment provided"});
        try {
            const comment = {comment:req.body.comment, commentator:req.user.username}
            const blog = await Blog.findOne({_id:req.body._id})
          
            if(!blog)
            return res.status(400).send({success: false, message:"no comment provided"});

            await Blog.findOneAndUpdate({_id:req.body._id},{$push:{comments:comment}},{new:true})

            return res.status(200).send({success: true, message:"comment"})
            
        } catch (error) {
            return res.status(400).send({success: false, message:error.message})
        }
    }

}

module.exports = blogCtrl;