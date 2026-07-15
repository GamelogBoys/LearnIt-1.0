// auth.middleware.js
const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owner.model');

module.exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            req.flash('error', 'Please log in first');
            return res.redirect('/auth');
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        
        // 🛑 Search the Admin/Owner DB specifically to verify access
        const adminUser = await ownerModel.findById(decoded.id || decoded._id);
        
        if (!adminUser) {
            req.flash('error', 'Access denied. Admins only!');
            return res.redirect('/cohort'); // Boot them back to the user area
        }

        req.user = adminUser;
        next();
    } catch (err) {
        req.flash('error', 'Session expired, please log in again');
        return res.redirect('/auth');
    }
};