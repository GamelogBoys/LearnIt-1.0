const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const ownerModel = require('../models/owner.model')

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first")
        return res.redirect('/auth')
    }
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET)

        let user = await userModel.findOne({ email: decoded.email }).select("-password")

        if (!user) {
            user = await ownerModel.findOne({ email: decoded.email }).select("-password")
        }

        if (!user) {
            res.clearCookie('token')
            req.flash("error", "Account not found.")
            return res.redirect('/auth')
        }

        req.user = user 
        next()
    }
    catch(err) {
        res.clearCookie('token')
        req.flash("error", "Something went wrong.")
        res.redirect('/auth')
    }
}