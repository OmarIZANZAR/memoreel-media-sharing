const express = require('express')
const cloudinary = require('cloudinary')
const mongoose = require("mongoose")
const Post = require('../models/Post.js')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_PUBLIC_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const router = express.Router()
    
// get all posts:
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1})
        res.status(200).json({isError: false, message: "all posts fetched", posts})
    } catch (err) {
        res.status(500).json({isError: true, message: "posts not fetched try reloading", info: err})
    }
})

// creating post:
router.post('/', async (req, res) => {
    const postData = {
        ...req.body
    }

    try {
        const newPost = new Post(postData)
        await newPost.save()
        res.status(201).json({isError: false, message: "post saved succefuly", post: newPost})
    } catch (err) {
        res.status(400).json({isError: true, message: "post not saved", info: err})
    }
})

// updating post:
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const post = req.body

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "post not found"})
        
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, {...post}, {new: true})

        if(updatedPost === null){
            return res.status(404).json({isError: true, message: "post not found"})
        }
        
        res.status(201).json({isError: false, message: `post ${id} updated`, post: updatedPost })
    } catch (err) {
        res.status(500).json({isError: true, message: "post not updated", info: err})
    }
})

// deleting post:
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send({isError: true, message: "post not found"})

    try {
        const data = await Post.findByIdAndDelete(id)

        if(data === null){
            return res.status(404).json({isError: true, message: "post not found"})
        }

        const result = await cloudinary.v2.uploader.destroy(data.media.public_id, {resource_type: data.media.resource_type});
        
        res.status(200).json({isError: false, message: `post ${id} deleted`, post: result })
    } catch (err) {
        res.status(500).json({isError: true, message: "post not deleted", info: err})
    }
})

module.exports = router;