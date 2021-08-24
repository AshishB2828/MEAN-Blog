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
    }

}

module.exports = blogCtrl;