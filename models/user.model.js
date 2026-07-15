const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    image: String,
    videosWatched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'video' }]
})

module.exports = mongoose.model('user', userSchema)