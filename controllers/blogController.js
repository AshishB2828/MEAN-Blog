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


}

module.exports = blogCtrl;