const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    creator: { type: String, required: true },
    tags: String,
    media: { type: Object, required: true },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Post', PostSchema)
module.exports = Post