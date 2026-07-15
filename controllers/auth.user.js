const userModel = require('../models/user.model')
const ownerModel = require('../models/owner.model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/token.generator')

module.exports.registerUser = async (req, res) => {
    const { fullname, email, password } = req.body

    try {
        const exist = await userModel.findOne({ email })
        if (exist) {
            req.flash('error', 'User already exists with this email!')
            return res.redirect('/auth')
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT) || 10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await userModel.create({
            fullname,
            email,
            password: hashedPassword
        })

        const token = generateToken(user)
        res.cookie("token", token)
        res.redirect('/cohort')

    } catch (err) {
        console.error("Registration Error:", err.message)
        req.flash('error', 'Something went wrong during registration.')
        res.redirect('/auth')
    }
}

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const adminAccount = await ownerModel.findOne({ email })

        if (adminAccount) {
            const isMatch = await bcrypt.compare(password, adminAccount.password)
            if (isMatch) {
                const token = generateToken(adminAccount)
                res.cookie("token", token) 
                return res.redirect('/admin/dashboard')
            } else {
                req.flash('error', "Invalid Credentials")
                return res.redirect('/auth')
            }
        }

        const userAccount = await userModel.findOne({ email })

        if (userAccount) {
            const isMatch = await bcrypt.compare(password, userAccount.password)
            if (isMatch) {
                // Generate token with normal user payload and save cookie
                const token = generateToken(userAccount)
                res.cookie("token", token)
                return res.redirect('/cohort')
            } else {
                req.flash('error', "Invalid Credentials")
                return res.redirect('/auth')
            }
        }

        req.flash('error', "Invalid Credentials")
        return res.redirect('/auth')

    } catch (err) {
        console.error("Login Error:", err.message)
        req.flash('error', "An unexpected error occurred during login.")
        res.redirect('/auth')
    }
}