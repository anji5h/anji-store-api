const { login, signup } = require('../controller/auth.controller');

const router = require('express').Router();

router.post('/login',login)
router.post('/signup',signup)
// router.post('/reset-password')

module.exports = router;