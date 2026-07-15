const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    title: String,
    thumbnail: { type: String, default: '/images/uploads/default.png' },
    videoPath: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    tag: String,
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] // <-- Add likes array array tracking
})

module.exports = mongoose.model('video', videoSchema)