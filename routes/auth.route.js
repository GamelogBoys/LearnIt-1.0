const express = require('express')
const router = express.Router()
const { registerUser } = require('../controllers/auth.user')
const { loginUser } = require('../controllers/auth.user')
const LoggedIn = require('../middleware/is.loggedIn')

router.get('/', (req, res) => {
    res.render("auth")
})

router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router