const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owner.model');

module.exports = async (req, res, next) => {
    if (!req.cookies.ownerToken) {
        req.flash("error", "Access Denied: Administrative Clearance Required.");
        return res.redirect('/auth'); // Or your dedicated admin login route
    }
    try {
        const decoded = jwt.verify(req.cookies.ownerToken, process.env.TOKEN_SECRET);
        const owner = await ownerModel.findOne({ email: decoded.email }).select("-password");
        
        if (!owner) {
            req.flash("error", "Unauthorized Administrator Account.");
            return res.redirect('/auth');
        }
        
        req.owner = owner;
        next();
    } catch (err) {
        req.flash("error", "Session expired or invalid credentials.");
        res.redirect('/auth');
    }
};