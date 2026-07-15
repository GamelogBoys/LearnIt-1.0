const mongoose = require('mongoose')
const debug = require('debug')("development:mongoose")

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB conncted")
})
.catch((err) => {
    console.log(err)
})

module.exports = mongoose