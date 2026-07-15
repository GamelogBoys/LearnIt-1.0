const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' }
});

module.exports = mongoose.model('owner', ownerSchema);